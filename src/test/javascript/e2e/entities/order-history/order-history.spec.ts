/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrderHistoryComponentsPage, OrderHistoryDeleteDialog, OrderHistoryUpdatePage } from './order-history.page-object';

const expect = chai.expect;

describe('OrderHistory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let orderHistoryUpdatePage: OrderHistoryUpdatePage;
    let orderHistoryComponentsPage: OrderHistoryComponentsPage;
    let orderHistoryDeleteDialog: OrderHistoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load OrderHistories', async () => {
        await navBarPage.goToEntity('order-history');
        orderHistoryComponentsPage = new OrderHistoryComponentsPage();
        await browser.wait(ec.visibilityOf(orderHistoryComponentsPage.title), 5000);
        expect(await orderHistoryComponentsPage.getTitle()).to.eq('Order Histories');
    });

    it('should load create OrderHistory page', async () => {
        await orderHistoryComponentsPage.clickOnCreateButton();
        orderHistoryUpdatePage = new OrderHistoryUpdatePage();
        expect(await orderHistoryUpdatePage.getPageTitle()).to.eq('Create or edit a Order History');
        await orderHistoryUpdatePage.cancel();
    });

    it('should create and save OrderHistories', async () => {
        const nbButtonsBeforeCreate = await orderHistoryComponentsPage.countDeleteButtons();

        await orderHistoryComponentsPage.clickOnCreateButton();
        await promise.all([
            orderHistoryUpdatePage.setAccountNameInput('accountName'),
            orderHistoryUpdatePage.setOrderStatusInput('orderStatus'),
            orderHistoryUpdatePage.setOrderDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            orderHistoryUpdatePage.setMovieTitleInput('movieTitle'),
            orderHistoryUpdatePage.setQuantityInput('5'),
            orderHistoryUpdatePage.setPriceInput('5')
        ]);
        expect(await orderHistoryUpdatePage.getAccountNameInput()).to.eq('accountName');
        expect(await orderHistoryUpdatePage.getOrderStatusInput()).to.eq('orderStatus');
        expect(await orderHistoryUpdatePage.getOrderDateInput()).to.contain('2001-01-01T02:30');
        expect(await orderHistoryUpdatePage.getMovieTitleInput()).to.eq('movieTitle');
        expect(await orderHistoryUpdatePage.getQuantityInput()).to.eq('5');
        expect(await orderHistoryUpdatePage.getPriceInput()).to.eq('5');
        await orderHistoryUpdatePage.save();
        expect(await orderHistoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await orderHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last OrderHistory', async () => {
        const nbButtonsBeforeDelete = await orderHistoryComponentsPage.countDeleteButtons();
        await orderHistoryComponentsPage.clickOnLastDeleteButton();

        orderHistoryDeleteDialog = new OrderHistoryDeleteDialog();
        expect(await orderHistoryDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Order History?');
        await orderHistoryDeleteDialog.clickOnConfirmButton();

        expect(await orderHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
