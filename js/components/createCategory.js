import { createElement } from "../helper/createElement.js"

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

        const button1 = createElement('button', {
            className: 'category__card',
        });
        item.append(button1);

        const span1 = createElement('span', {
            className: 'category__title',
            textContent: data.title,
        });
        button1.append(span1);

        const span2 = createElement('span', {
            className: 'category__pairs',
            textContent: `${data.length} пар`,
        });
        button1.append(span2);

        const button2 = createElement('button', {
            className: 'category__btn category__edit',
            ariaLabel: 'редактировать',
        });
        item.append(button2);

        const button3 = createElement('button', {
            className: 'category__btn category__del',
            ariaLabel: 'удалить',
        });
        item.append(button3);

        return item;
    }

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