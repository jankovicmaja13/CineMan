import { Injectable } from '@angular/core';
import { Genre } from 'src/app/model/genre.model';
import { BehaviorSubject } from 'rxjs';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/model/movie.model';
import { Rating } from 'src/app/model/rating.model';
import { Category } from 'src/app/model/category.model';
import { Actor } from 'src/app/model/actor.model';
import { Content } from 'src/app/model/content.model';
import { Award } from 'src/app/model/award.model';


export interface MovieData {
  name?: string;
  producer?: string;
  image: string;
  description: string;
  year: number;
  genre: Genre;
  country: string;
  budget: number;
  duration: number;
  fetchedUserId: string;
  grade: number;
  peopleRated: number;
}

export interface AwardDAta {
  name?: string;
  director?: string;
  date: Date;
  country: string;
  description: string;
  image: string;
  category: Category;
  actor: Actor;
  content: Content;
  userID: string;
}

export interface RatingData{
  user: string;
  movieID: string;
  rate: number;
}

export interface CategoryData{
  name: string;
  director: string;
  date: Date;
  country: string;
  description: string;
  image: string;
  category: Category;
  actor: Actor;
  content: Content;
}

@Injectable({
  providedIn: 'root'
})
export class AwardService {
  // tslint:disable-next-line: variable-name
  private _genres = new BehaviorSubject<Genre[]>([]);
  // tslint:disable-next-line: variable-name
  private _movies = new BehaviorSubject<Movie[]>([]);
  // tslint:disable-next-line: variable-name
  private _ratings = new BehaviorSubject<Rating[]>([]);
  // tslint:disable-next-line: variable-name
  private _categories = new BehaviorSubject<Category[]>([]);
   // tslint:disable-next-line: variable-name
  private _awards = new BehaviorSubject<Award[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) { }
  
  get categories() {
    return this._categories.asObservable();
  }
  get awards() {
    return this._awards.asObservable();
  }

  getAwards() {
    console.log('getAwards service');
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: AwardDAta }>(
            `https://movies-app-6bff9.firebaseio.com/awards.json?auth=${token}`
          );
      }),
      map((awardData) => {
        console.log(awardData);
        const awards: Award[] = [];
        for (const key in awardData) {
          if (awardData.hasOwnProperty(key)) {
            awards.push(
              new Award(
                key,
                awardData[key].name,
                awardData[key].director,
                awardData[key].date,
                awardData[key].country,
                awardData[key].description,
                awardData[key].image,
                awardData[key].category,
                awardData[key].actor,
                awardData[key].content,
                awardData[key].userID
              ));
          }
        }
        return awards;
      }),
      tap(awards => {
        this._awards.next(awards);
      })
    );

  }




  addAward(award: Award) {
    let generatedId;
    let fetchedUserId: string;

    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {

        award.userID = fetchedUserId;
        return this.http
          .post<{ name: string }>(
            `https://movies-app-6bff9.firebaseio.com/awards.json?auth=${token}`,
            award
          );
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.awards;
      }),
      take(1),
      tap((awards) => {
        award.id = generatedId;
        this._awards.next(
          awards.concat(award)
        );
      })
    );
  }

  deleteAward(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .delete(`https://movies-app-6bff9.firebaseio.com/awards/${id}.json?auth=${token}`);
      }),
      switchMap(() => {
        return this.awards;
      }),
      take(1),
      tap((awards) => {
        this._awards.next(awards.filter((a) => a.id !== id));
      })
    );
  }


  editAward(award: Award) {

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .put(`https://movies-app-6bff9.firebaseio.com/awards/${award.id}.json?auth=${token}`, 
          award
          );
      }),
      switchMap(() => this.awards),
      take(1),
      tap((awards) => {
        const updatedAwardID = awards.findIndex((a) => a.id === award.id);
        const updatedAwards = [...awards];
        updatedAwards[updatedAwardID] = award;
        this._awards.next(updatedAwards);
      })
    );

  }
}
