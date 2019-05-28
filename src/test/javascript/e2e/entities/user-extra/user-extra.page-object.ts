import { element, by, ElementFinder } from 'protractor';

export class UserExtraComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-user-extra div table .btn-danger'));
    title = element.all(by.css('jhi-user-extra div h2#page-heading span')).first();

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

export class UserExtraUpdatePage {
    pageTitle = element(by.id('jhi-user-extra-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    phoneNumberInput = element(by.id('field_phoneNumber'));
    addressInput = element(by.id('field_address'));
    dateOfBirthInput = element(by.id('field_dateOfBirth'));
    userSelect = element(by.id('field_user'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setPhoneNumberInput(phoneNumber) {
        await this.phoneNumberInput.sendKeys(phoneNumber);
    }

    async getPhoneNumberInput() {
        return this.phoneNumberInput.getAttribute('value');
    }

    async setAddressInput(address) {
        await this.addressInput.sendKeys(address);
    }

    async getAddressInput() {
        return this.addressInput.getAttribute('value');
    }

    async setDateOfBirthInput(dateOfBirth) {
        await this.dateOfBirthInput.sendKeys(dateOfBirth);
    }

    async getDateOfBirthInput() {
        return this.dateOfBirthInput.getAttribute('value');
    }

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
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

export class UserExtraDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-userExtra-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-userExtra'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
