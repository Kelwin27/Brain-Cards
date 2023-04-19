import { createCategory } from "./components/createCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createElement } from "./helper/createElement.js";
import { fetchCategories } from "./service/apiService.js";

const initApp = async () => {
    const headerParent = document.querySelector('.header')
    const app = document.querySelector('#app')

    const headerObject = createHeader(headerParent);
    const categoryObject = createCategory(app);

    const renderIndex = async e => {
        e?.preventDefault();
        const categories = await fetchCategories();

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
        categoryObject.unMount();
        headerObject.updateHeaderTitle( 'Новая категория' );
    });
}

initApp()