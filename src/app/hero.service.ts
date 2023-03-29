import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, from, map, Observable, of, tap } from 'rxjs';
import { HeroIndexResponse } from './heroes.index.response';
import { HeroStoreResponse } from './heroes.store.response';
import { HeroShowResponse } from './heroes.show.response';
import { HeroUpdateResponse } from './heroes.update.response';
import { HeroDeleteResponse } from './heroes.delete.response';
@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private readonly heroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);

  private heroesUrl = 'https://hero-backend.ddev.site/api/v1.0/heroes';  // URL to web api

  public readonly heroes$ = this.heroes.asObservable();

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer 1|qb0c4lpAIjYw3KalS8uQg2fInA4HGY0RRG0JIOAF'
      }
    )
  };

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
    this.httpClient.get<HeroIndexResponse>(this.heroesUrl, this.httpOptions).pipe(
      tap(_ => this.log('fetched heroes HTTP')),
      catchError(this.handleError<HeroIndexResponse>('constructor'))
    ).subscribe(response => {
      // console.log(response);

      this.heroes.next(response.data)
    });
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): void {

    this.httpClient.post<HeroStoreResponse>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((response: HeroStoreResponse) => {
          this.log(`added hero w/ uuid=${response.data.uuid}`);
        }),
        catchError(this.handleError<HeroStoreResponse>('addHero'))
      )
      .subscribe(
        response => {
          this.heroes.next([...this.heroes.getValue(), response.data]);
        })

  }

  /** GET hero by id. Will 404 if id not found */
  getHero(uuid: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${uuid}`;
    return this.httpClient.get<HeroShowResponse>(url, this.httpOptions).pipe(
      map(response => response.data),
      tap(_ => this.log(`fetched hero uuid=${uuid}`)),
      catchError(this.handleError<Hero>(`getHero uuid=${uuid}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.uuid}`;
    return this.httpClient.put<HeroUpdateResponse>(url, hero, this.httpOptions).pipe(
      map(response => response.data),
      tap(updatedHero => {
        let list = this.heroes.getValue();
        list.forEach(function (item, i) { if (item.uuid == hero.uuid) list[i] = updatedHero });
        this.heroes.next(list);
      }),
      tap(_ => this.log(`updated hero uuid=${hero.uuid}`)),
      catchError(this.handleError<Hero>(`getHero uuid=${hero.uuid}`))
    );

  }

  /** DELETE: delete the hero from the server */
  deleteHero(uuid: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${uuid}`;

    return this.httpClient.delete<HeroDeleteResponse>(url, this.httpOptions).pipe(

      tap( (response : HeroDeleteResponse) => {

        let list = this.heroes.getValue();
        list = list.filter(h => h.uuid != uuid);

        this.heroes.next(list);
      }),
      map((response : HeroDeleteResponse) => {
        return  response?.data
      }),

      tap(_ => this.log(`deleted hero uuid=${uuid}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }


  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {

    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.httpClient.get<HeroIndexResponse>(`${this.heroesUrl}/search/${term}`, this.httpOptions).pipe(
      map(response => response.data),
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
