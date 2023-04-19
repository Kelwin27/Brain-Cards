import { createElement } from "../helper/createElement.js"

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

    const mount = (data) => {
        spanCardItemFront.textContent = data[0];
        spanCardItemBack.textContent = data[1];
        app.append(createPair);
    };

    const unMount = () => {
        createPair.remove();
    };

    return {mount, unMount};
}