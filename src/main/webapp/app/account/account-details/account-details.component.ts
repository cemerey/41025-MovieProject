import { Component, OnInit } from '@angular/core';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'jhi-account-details',
    templateUrl: './account-details.component.html',
    styles: []
})
export class AccountDetailsComponent implements OnInit {
    account: any;
    userExtra: IUserExtra;

    constructor(private toastr: ToastrService) {}

    ngOnInit() {}
}
