import { NgModule } from '@angular/core';

import { MovieProjectSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [MovieProjectSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [MovieProjectSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class MovieProjectSharedCommonModule {}
