import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderHistory } from 'app/shared/model/order-history.model';
import { AccountService } from 'app/core';
import { OrderHistoryService } from './order-history.service';

@Component({
    selector: 'jhi-order-history',
    templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
    orderHistories: IOrderHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected orderHistoryService: OrderHistoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.orderHistoryService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IOrderHistory[]>) => res.ok),
                    map((res: HttpResponse<IOrderHistory[]>) => res.body)
                )
                .subscribe((res: IOrderHistory[]) => (this.orderHistories = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.orderHistoryService
            .query()
            .pipe(
                filter((res: HttpResponse<IOrderHistory[]>) => res.ok),
                map((res: HttpResponse<IOrderHistory[]>) => res.body)
            )
            .subscribe(
                (res: IOrderHistory[]) => {
                    this.orderHistories = res;
                    this.currentSearch = '';

                    // if user role is user, then filter order history to show only orders for that user
                    if (this.currentAccount.authorities.length === 1 && this.currentAccount.authorities.includes('ROLE_USER')) {
                        this.orderHistories = this.orderHistories.filter(
                            orderHistory => orderHistory.accountName === this.currentAccount.login
                        );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
            this.loadAll();
        });

        this.registerChangeInOrderHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderHistory) {
        return item.id;
    }

    registerChangeInOrderHistories() {
        this.eventSubscriber = this.eventManager.subscribe('orderHistoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
