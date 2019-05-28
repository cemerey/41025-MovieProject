import { Component, OnInit } from '@angular/core';

import { AccountService } from 'app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    settingsAccount: any;
    languages: any[];

    constructor(private accountService: AccountService, private toastr: ToastrService) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.settingsAccount = this.copyAccount(account);
        });
    }

    save() {
        this.accountService.save(this.settingsAccount).subscribe(
            () => {
                this.toastr.success('Settings updated successfully');
                this.accountService.identity(true).then(account => {
                    this.settingsAccount = this.copyAccount(account);
                });
            },
            () => {
                this.toastr.error('Error updating settings');
            }
        );
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}
