import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MovieProjectSharedModule } from 'app/shared';

import {
    PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    accountState
} from './';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { UserExtraComponent, UserExtraDetailComponent, UserExtraUpdateComponent } from 'app/entities/user-extra';

@NgModule({
    imports: [MovieProjectSharedModule, RouterModule.forChild(accountState)],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent,
        AccountDetailsComponent,
        UserExtraComponent,
        UserExtraUpdateComponent,
        UserExtraDetailComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieProjectAccountModule {}
