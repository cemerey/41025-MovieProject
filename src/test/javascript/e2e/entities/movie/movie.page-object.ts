import { element, by, ElementFinder } from 'protractor';

export class MovieComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-movie div table .btn-danger'));
    title = element.all(by.css('jhi-movie div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class MovieUpdatePage {
    pageTitle = element(by.id('jhi-movie-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    genreInput = element(by.id('field_genre'));
    descriptionInput = element(by.id('field_description'));
    imageInput = element(by.id('file_image'));
    qtyInStockInput = element(by.id('field_qtyInStock'));
    priceInput = element(by.id('field_price'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setGenreInput(genre) {
        await this.genreInput.sendKeys(genre);
    }

    async getGenreInput() {
        return this.genreInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    async setQtyInStockInput(qtyInStock) {
        await this.qtyInStockInput.sendKeys(qtyInStock);
    }

    async getQtyInStockInput() {
        return this.qtyInStockInput.getAttribute('value');
    }

    async setPriceInput(price) {
        await this.priceInput.sendKeys(price);
    }

    async getPriceInput() {
        return this.priceInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class MovieDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-movie-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-movie'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
