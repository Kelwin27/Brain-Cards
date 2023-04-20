import { createElement } from "../helper/createElement.js";
import { shuffleArr } from "../helper/shuffleArr.js";
import { showAlert } from "./showAlert.js";

export const createPairs = (app) => {

    const createPair = createElement('section', {
        className: 'card section-offset',
    });

    const cardContainer = createElement('div', {
        className: 'container card__container',
    });
    
    const buttonReturnCard = createElement('button', {
        className: 'card__return',
        ariaLabel: 'Возврат к категориям',
    });

    const buttonCardItem = createElement('button', {
        className: 'card__item',
    });
    
    const spanCardItemFront = createElement('span', {
        className: 'card__front',
        textContent: '',
    });
    
    const spanCardItemBack = createElement('span', {
        className: 'card__back',
        textContent: '',
    });
    createPair.append(cardContainer)
    cardContainer.append(buttonReturnCard, buttonCardItem);
    buttonCardItem.append(spanCardItemFront, spanCardItemBack);

    const cardController = data => {
        let index = 0;
        spanCardItemFront.textContent = data[index][0];
        spanCardItemBack.textContent = data[index][1];
        const flipCard = () => {
            buttonCardItem.classList.add('card__item_flipped');
            buttonCardItem.removeEventListener('click', flipCard);
            console.log(index)
            setTimeout(() => {
                buttonCardItem.classList.remove('card__item_flipped');
                setTimeout(() => {
                    index++;
                    if (index === data.length) {
                        spanCardItemFront.textContent = 'the end';
                        showAlert('Вернемся к категориям', 2000);
                        setTimeout(() => {
                            buttonReturnCard.click();
                        }, 2000);
                        return;
                    };
                    spanCardItemFront.textContent = data[index][0];
                    spanCardItemBack.textContent = data[index][1];
                    setTimeout(() => {
                        buttonCardItem.addEventListener('click', flipCard);
                    }, 200);
                }, 100);
            }, 1000);
        };
        buttonCardItem.addEventListener('click', flipCard);
    };

    const mount = (data) => {
        const tempArr = shuffleArr(data.pairs)
        cardController(tempArr);
        app.append(createPair);
    };

    const unMount = () => {
        createPair.remove();
    };

    return { buttonReturnCard, mount, unMount };
}