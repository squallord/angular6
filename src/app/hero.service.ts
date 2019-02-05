import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()

export class HeroService {

  private heroesUrl: string = 'api/heroes';
  private httpOptions: {headers: HttpHeaders} = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(() => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any) => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getHero(id: number): Observable<Hero> {
    const url: string = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(() => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    if (!hero.name.trim()) {
      this.log(`hero without name`);
      return;
    }
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(() => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>(`updateHero id=${hero.id}`))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero id=${newHero.id}`)),
        catchError(this.handleError<Hero>(`addHero name=${hero.name}`))
      );
  }

  deletehero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(() => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>(`deleteHero`))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim())
      return of([]);

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(() => this.log(`found heroes matching ${term}`)),
        catchError(this.handleError<Hero[]>(`searchHeroes`, []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}