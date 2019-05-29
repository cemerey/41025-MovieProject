/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MovieProjectTestModule } from '../../../test.module';
import { MovieComponent } from 'app/entities/movie/movie.component';
import { MovieService } from 'app/entities/movie/movie.service';
import { Movie } from 'app/shared/model/movie.model';

describe('Component Tests', () => {
    describe('Movie Management Component', () => {
        let comp: MovieComponent;
        let fixture: ComponentFixture<MovieComponent>;
        let service: MovieService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MovieProjectTestModule],
                declarations: [MovieComponent],
                providers: []
            })
                .overrideTemplate(MovieComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MovieComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovieService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Movie(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.movies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
