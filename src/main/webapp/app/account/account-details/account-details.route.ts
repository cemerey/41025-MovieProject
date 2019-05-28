import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { AccountDetailsComponent } from 'app/account/account-details/account-details.component';

export const accountDetailsRoute: Route = {
    path: 'account-details',
    component: AccountDetailsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Account Details'
    },
    canActivate: [UserRouteAccessService]
};
