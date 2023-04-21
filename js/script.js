import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createPairs } from "./components/createPairs.js";
import { showAlert } from "./components/showAlert.js";
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories, fetchCreateCategory, fetchDeleteCategory, fetchEditCategory } from "./service/apiService.js";

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

    const postHendler = async () => {
        const data = editCategoryObject.parseData();
        const dataCategory = await fetchCreateCategory(data);
        if (dataCategory.error){
            showAlert(dataCategory.error.massage);
            return;
        }
        showAlert(`Категория ${data.title} добавлена`);
        allSectionUnmount();
        headerObject.updateHeaderTitle( 'Категории' );
        categoryObject.mount(dataCategory);
    };
    const patchHendler = async () => {
        const data = editCategoryObject.parseData();
        const dataCategory = await fetchEditCategory(editCategoryObject.btnSave.dataset.id, data);
        if (dataCategory.error){
            showAlert(dataCategory.error.massage);
            return;
        }
        showAlert(`Категория ${data.title} обновлена`);
        allSectionUnmount();
        headerObject.updateHeaderTitle( 'Категории' );
        categoryObject.mount(dataCategory);
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
        editCategoryObject.btnSave.addEventListener('click', postHendler);
        editCategoryObject.btnSave.removeEventListener('click', patchHendler);
    });

    categoryObject.categoryList.addEventListener('click', async ({ target }) => {
        const categoryItem = target.closest('.category__item');

        if (target.closest('.category__edit')){
            const dataCards = await fetchCards(categoryItem.dataset.id);
            allSectionUnmount();
            headerObject.updateHeaderTitle('Редактирование');
            editCategoryObject.mount(dataCards);
            editCategoryObject.btnSave.addEventListener('click', patchHendler);
            editCategoryObject.btnSave.removeEventListener('click', postHendler);
            editCategoryObject.btnCancel.addEventListener('click', () => {
                if (confirm('Вы уверены что не хотите сохранить?')) {
                    renderIndex;
                }
            });

            return;
        }
        if (target.closest('.category__del')){
            if (confirm("Вы уверены?")){
                const result = fetchDeleteCategory(categoryItem.dataset.id);
                if (result.error){
                    showAlert(result.error.massage);
                    return;
                }
                showAlert('Категория удалена');
                categoryItem.remove();
            };
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