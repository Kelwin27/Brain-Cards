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

    let dataCards = [];
    const flipCard = () => {
        buttonCardItem.classList.add('card__item_flipped');
        buttonCardItem.removeEventListener('click', flipCard);
        setTimeout(() => {
            buttonCardItem.classList.remove('card__item_flipped');
            setTimeout(() => {
                buttonCardItem.index++;
                if (buttonCardItem.index === dataCards.length) {
                    spanCardItemFront.textContent = 'the end';
                    showAlert('Вернемся к категориям', 2000);
                    setTimeout(() => {
                        buttonReturnCard.click();
                    }, 2000);
                    return;
                };
                spanCardItemFront.textContent = dataCards[buttonCardItem.index][0];
                spanCardItemBack.textContent = dataCards[buttonCardItem.index][1];
                setTimeout(() => {
                    buttonCardItem.addEventListener('click', flipCard);
                }, 200);
            }, 100);
        }, 1000);
    };
    const cardController = data => {
        dataCards = [...data];
        buttonCardItem.index = 0;
        spanCardItemFront.textContent = data[buttonCardItem.index][0];
        spanCardItemBack.textContent = data[buttonCardItem.index][1];
        buttonCardItem.addEventListener('click', flipCard);
    };

    const mount = (data) => {
        const tempArr = shuffleArr(data.pairs)
        cardController(tempArr);
        app.append(createPair);
    };

    const unMount = () => {
        createPair.remove();
        buttonCardItem.removeEventListener('click', flipCard);
    };

    return { buttonReturnCard, mount, unMount };
}