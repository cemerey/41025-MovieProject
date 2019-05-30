import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMovie, Movie } from 'app/shared/model/movie.model';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<IMovie>;
type EntityArrayResponseType = HttpResponse<IMovie[]>;

@Injectable({ providedIn: 'root' })
export class MovieService {
    public resourceUrl = SERVER_API_URL + 'api/movies';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/movies';

    constructor(protected http: HttpClient) {}

    create(movie: IMovie): Observable<EntityResponseType> {
        return this.http.post<IMovie>(this.resourceUrl, movie, { observe: 'response' });
    }

    update(movie: IMovie): Observable<EntityResponseType> {
        return this.http.put<IMovie>(this.resourceUrl, movie, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMovie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMovie[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMovie[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }

    get(id: number) {
        return this.find(id).pipe(map((movie: HttpResponse<Movie>) => movie.body));
    }
}
