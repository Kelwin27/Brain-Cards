import { createElement } from "../helper/createElement.js"
import { sklonenie } from "../helper/ending.js";

export const createCategory = (app) => {

    const category = createElement('section', {
        className: 'category section-offset',
    });

    const container = createElement('div', {
        className: 'container',
    });

    category.append(container);

    const categoryList = createElement('ul', {
        className: 'category__list',
    });

    container.append(categoryList);

    const createCategoryCard = (data) => {
        const item = createElement('li', {
            className: 'category__item',
        });
        item.dataset.id = data.id;

        const buttonCard = createElement('button', {
            className: 'category__card',
        });

        const spanTitle = createElement('span', {
            className: 'category__title',
            textContent: data.title,
        });

        const spanLength = createElement('span', {
            className: 'category__pairs',
            textContent: `${data.length} ${sklonenie(data.length, ['пара', 'пары', 'пар'])}`,
        });
        buttonCard.append(spanTitle, spanLength);

        const buttonEdit = createElement('button', {
            className: 'category__btn category__edit',
            ariaLabel: 'редактировать',
        });

        const buttonDelit = createElement('button', {
            className: 'category__btn category__del',
            ariaLabel: 'удалить',
        });
        item.append(buttonCard, buttonEdit, buttonDelit);

        return item;
    };

    const mount = (data) => {
        categoryList.textContent = '';
        app.append(category);
        const cards = data.map(createCategoryCard);
        categoryList.append(...cards);
    };

    const unMount = () => {
        category.remove();
    };
    return {mount, unMount, categoryList}
}