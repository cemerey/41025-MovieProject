import { element, by, ElementFinder } from 'protractor';

export class OrderHistoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-order-history div table .btn-danger'));
    title = element.all(by.css('jhi-order-history div h2#page-heading span')).first();

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

export class OrderHistoryUpdatePage {
    pageTitle = element(by.id('jhi-order-history-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    accountNameInput = element(by.id('field_accountName'));
    orderStatusInput = element(by.id('field_orderStatus'));
    orderDateInput = element(by.id('field_orderDate'));
    movieTitleInput = element(by.id('field_movieTitle'));
    quantityInput = element(by.id('field_quantity'));
    priceInput = element(by.id('field_price'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setAccountNameInput(accountName) {
        await this.accountNameInput.sendKeys(accountName);
    }

    async getAccountNameInput() {
        return this.accountNameInput.getAttribute('value');
    }

    async setOrderStatusInput(orderStatus) {
        await this.orderStatusInput.sendKeys(orderStatus);
    }

    async getOrderStatusInput() {
        return this.orderStatusInput.getAttribute('value');
    }

    async setOrderDateInput(orderDate) {
        await this.orderDateInput.sendKeys(orderDate);
    }

    async getOrderDateInput() {
        return this.orderDateInput.getAttribute('value');
    }

    async setMovieTitleInput(movieTitle) {
        await this.movieTitleInput.sendKeys(movieTitle);
    }

    async getMovieTitleInput() {
        return this.movieTitleInput.getAttribute('value');
    }

    async setQuantityInput(quantity) {
        await this.quantityInput.sendKeys(quantity);
    }

    async getQuantityInput() {
        return this.quantityInput.getAttribute('value');
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

export class OrderHistoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-orderHistory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-orderHistory'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
