import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MovieProjectSharedModule } from 'app/shared';
import {
    MovieComponent,
    MovieDetailComponent,
    MovieUpdateComponent,
    MovieDeletePopupComponent,
    MovieDeleteDialogComponent,
    movieRoute,
    moviePopupRoute
} from './';
import { shoppingCartRoute } from 'app/shopping-cart/shopping-cart.route';
import { ShoppingCartComponent } from 'app/shopping-cart/shopping-cart.component';

const ENTITY_STATES = [...movieRoute, ...moviePopupRoute, shoppingCartRoute];

@NgModule({
    imports: [MovieProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MovieComponent,
        MovieDetailComponent,
        MovieUpdateComponent,
        MovieDeleteDialogComponent,
        MovieDeletePopupComponent,
        ShoppingCartComponent
    ],
    entryComponents: [MovieComponent, MovieUpdateComponent, MovieDeleteDialogComponent, MovieDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieProjectMovieModule {}
