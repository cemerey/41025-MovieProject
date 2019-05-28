import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';
import { AccountService, IUser } from 'app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'jhi-user-extra-update',
    templateUrl: './user-extra-update.component.html',
    styleUrls: ['./user.scss']
})
export class UserExtraUpdateComponent implements OnInit {
    userExtra: IUserExtra;
    isSaving: boolean;
    account: any;

    users: IUser[];
    dateOfBirthDp: any;

    constructor(private toastr: ToastrService, protected userExtraService: UserExtraService, private accountService: AccountService) {}

    ngOnInit() {
        this.isSaving = false;
        this.accountService.identity().then(account => {
            this.account = account;
            this.userExtraService.find(account.id).subscribe(userExtra => {
                this.userExtra = userExtra.body;
            });
        });
    }

    previousState() {
        window.history.back();
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
        this.toastr.success('Additional Settings saved!', null, null);
    }

    protected onSaveError(errorMessage: string) {
        this.isSaving = false;
        this.toastr.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
