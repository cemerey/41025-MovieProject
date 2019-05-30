import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ShoppingCartComponent } from 'app/shopping-cart/shopping-cart.component';

export const shoppingCartRoute: Route = {
    path: 'cart',
    component: ShoppingCartComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Cart'
    },
    canActivate: [UserRouteAccessService]
};
