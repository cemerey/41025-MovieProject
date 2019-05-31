import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IOrderHistory } from 'app/shared/model/order-history.model';
import { OrderHistoryService } from './order-history.service';

@Component({
    selector: 'jhi-order-history-update',
    templateUrl: './order-history-update.component.html'
})
export class OrderHistoryUpdateComponent implements OnInit {
    orderHistory: IOrderHistory;
    isSaving: boolean;
    orderDate: string;

    constructor(protected orderHistoryService: OrderHistoryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderHistory }) => {
            this.orderHistory = orderHistory;
            this.orderDate = this.orderHistory.orderDate != null ? this.orderHistory.orderDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.orderHistory.orderDate = this.orderDate != null ? moment(this.orderDate, DATE_TIME_FORMAT) : null;
        if (this.orderHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.orderHistoryService.update(this.orderHistory));
        } else {
            this.subscribeToSaveResponse(this.orderHistoryService.create(this.orderHistory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderHistory>>) {
        result.subscribe((res: HttpResponse<IOrderHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
