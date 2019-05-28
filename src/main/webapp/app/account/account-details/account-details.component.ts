import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { UserExtraService } from 'app/entities/user-extra';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-account-details',
    templateUrl: './account-details.component.html',
    styles: []
})
export class AccountDetailsComponent implements OnInit {
    account: any;
    userExtra: IUserExtra;
    isSaving: boolean;

    constructor(
        private accountService: AccountService,
        private userExtraService: UserExtraService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.accountService.identity().then(account => {
            this.account = account;
            this.userExtraService.find(account.id).subscribe(userExtra => {
                this.userExtra = userExtra.body;
            });
        });
    }

    save() {
        this.isSaving = true;
        if (this.userExtra.id !== undefined) {
            this.subscribeToSaveResponse(this.userExtraService.update(this.userExtra));
        } else {
            this.subscribeToSaveResponse(this.userExtraService.create(this.userExtra));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtra>>) {
        result.subscribe((res: HttpResponse<IUserExtra>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError(res.error));
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.jhiAlertService.success('Details Updated', null, null);
    }

    protected onSaveError(errorMessage: string) {
        this.isSaving = false;
        this.jhiAlertService.error(errorMessage, null, null);
    }

    previousState() {
        window.history.back();
    }
}
