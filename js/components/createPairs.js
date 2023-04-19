import { createElement } from "../helper/createElement.js"

export const createPairs = (app) => {

    const createCard = (data) => {

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
            textContent: data[0],
        });
        
        const spanCardItemBack = createElement('span', {
            className: 'card__back',
            textContent: data[1],
        });
        buttonCardItem.append(spanCardItemFront, spanCardItemBack);
        
        cardContainer.append(buttonReturnCard, buttonCardItem);
        createPair.append(cardContainer);

        return createPair;
    }
        
    const mount = (data) => {
        app.append(createCard(data));
    };

    const unMount = () => {
        createCard.remove();
    };

    return {mount, unMount};
}