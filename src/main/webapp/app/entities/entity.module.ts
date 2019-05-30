import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'user-extra',
                loadChildren: './user-extra/user-extra.module#MovieProjectUserExtraModule'
            },
            {
                path: 'user-extra',
                loadChildren: './user-extra/user-extra.module#MovieProjectUserExtraModule'
            },
            {
                path: 'movie',
                loadChildren: './movie/movie.module#MovieProjectMovieModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieProjectEntityModule {}
