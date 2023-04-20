import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createPairs } from "./components/createPairs.js";
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories } from "./service/apiService.js";

const initApp = async () => {
    const headerParent = document.querySelector('.header')
    const app = document.querySelector('#app')

    const headerObject = createHeader(headerParent);
    const categoryObject = createCategory(app);
    const editCategoryObject = createEditCategory(app);
    const pairsObject = createPairs(app);

    const allSectionUnmount = () => {
        [categoryObject, editCategoryObject, pairsObject].forEach(obj => obj.unMount());
    };

    const renderIndex = async e => {
        e?.preventDefault();
        allSectionUnmount();
        const categories = await fetchCategories();
        headerObject.updateHeaderTitle( 'Категории' );

        if (categories.error) {
            app.append(createElement('p', {
                className: 'server-error',
                textContent: "server mistake",
            }));
            return;
        }
    
        categoryObject.mount(categories);
    }
    renderIndex();
    headerObject.headerLogoLink.addEventListener( 'click', renderIndex);
    headerObject.headerBtn.addEventListener( 'click', () => {
        allSectionUnmount();
        headerObject.updateHeaderTitle( 'Новая категория' );
        editCategoryObject.mount();
    });

    categoryObject.categoryList.addEventListener('click', async ({ target }) => {
        const categoryItem = target.closest('.category__item');

        if (target.closest('.category__edit')){
            const dataCards = await fetchCards(categoryItem.dataset.id);
            allSectionUnmount();
            headerObject.updateHeaderTitle('Редактирование');
            editCategoryObject.mount(dataCards);
            return;
        }
        if (target.closest('.category__del')){
            console.log('del');
            return;
        };
        if (categoryItem) {
            allSectionUnmount();
            const dataCard = await fetchCards(categoryItem.dataset.id);
            headerObject.updateHeaderTitle(dataCard.title);
            pairsObject.mount(dataCard);
            return;
        };
    });
    pairsObject.buttonReturnCard.addEventListener('click', renderIndex);
};

initApp()