import { Injectable } from '@angular/core';
import { Genre } from 'src/app/model/genre.model';
import { BehaviorSubject } from 'rxjs';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Series } from 'src/app/model/series.model';
import { Rating } from 'src/app/model/rating.model';

interface GenreData {
  name: string;
}

export interface SeriesData {
  name?: string;
  producer?: string;
  image: string;
  description: string;
  year: number;
  genre: Genre;
  country: string;
  numberOfSeasons: number;
  averageDuration: number;
  fetchedUserId: string;
  grade: number;
  peopleRated: number;
}

export interface RatingData{
  user: string;
  movieID: string;
  rate: number;
}

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  // tslint:disable-next-line: variable-name
  private _genres = new BehaviorSubject<Genre[]>([]);
  // tslint:disable-next-line: variable-name
  private _series = new BehaviorSubject<Series[]>([]);
  // tslint:disable-next-line: variable-name
  private _ratings = new BehaviorSubject<Rating[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) { }

  get genres() {
    return this._genres.asObservable();
  }

  get series() {
    return this._series.asObservable();
  }

  get ratings() {
    return this._ratings.asObservable();
  }

  getGenres() {
    console.log('getGenres service');
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: GenreData }>(
            `https://movies-app-6bff9.firebaseio.com/genre.json?auth=${token}`
          );
      }),
      map((genresData) => {
        console.log(genresData);
        const genres: Genre[] = [];
        for (const key in genresData) {
          if (genresData.hasOwnProperty(key)) {
            genres.push(
              new Genre(
                key,
                genresData[key].name
              ));
          }
        }
        return genres;
      }),
      tap(genres => {
        this._genres.next(genres);
      })
    );

  }

  getRatings() {
    console.log('getRatings service');
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: RatingData }>(
            `https://movies-app-6bff9.firebaseio.com/ratings.json?auth=${token}`
          );
      }),
      map((ratingData) => {
        console.log(ratingData);
        const ratings: Rating[] = [];
        for (const key in ratingData) {
          if (ratingData.hasOwnProperty(key)) {
            ratings.push(
              new Rating(
                key,
                ratingData[key].user,
                ratingData[key].movieID,
                ratingData[key].rate
              ));
          }
        }
        return ratings;
      }),
      tap(ratings => {
        this._ratings.next(ratings);
      })
    );

  }

  getSeries() {
    console.log('getSeries service');
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: SeriesData }>(
            `https://movies-app-6bff9.firebaseio.com/series.json?auth=${token}`
          );
      }),
      map((seriesData) => {
        console.log(seriesData);
        const series: Series[] = [];
        for (const key in seriesData) {
          if (seriesData.hasOwnProperty(key)) {
            series.push(
              new Series(
                key,
                seriesData[key].name,
                seriesData[key].producer,
                seriesData[key].image,
                seriesData[key].description,
                seriesData[key].year,
                seriesData[key].country,
                seriesData[key].genre,
                seriesData[key].numberOfSeasons,
                seriesData[key].averageDuration,
                seriesData[key].fetchedUserId,
                seriesData[key].grade,
                seriesData[key].peopleRated

              ));
          }
        }
        return series;
      }),
      tap(series => {
        this._series.next(series);
      })
    );

  }

  addShow(show: Series) {
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

        show.userId = fetchedUserId;
        console.log(show.genre.name);
        return this.http
          .post<{ name: string }>(
            `https://movies-app-6bff9.firebaseio.com/series.json?auth=${token}`,
            show
          );
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.series;
      }),
      take(1),
      tap((series) => {
        show.id = generatedId;
        this._series.next(
          series.concat(show)
        );
      })
    );
  }

  addRating(rating: Rating) {
    let fetchedUserId: string;
    let generatedId;

    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        return this.http
          .post<{ name: string }>(
            `https://movies-app-6bff9.firebaseio.com/ratings.json?auth=${token}`,
            rating
          );
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.ratings;
      }),
      take(1),
      tap((ratings) => {
        rating.id = generatedId;
        this._ratings.next(
          ratings.concat(rating)
        );
      })
    );
  }

  getShow(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<SeriesData>(`https://movies-app-6bff9.firebaseio.com/series/${id}.json?auth=${token}`);
      }),
      map((resData) => {
        console.log(resData);
        return new Series(
          id,
          resData.name,
          resData.producer,
          resData.image,
          resData.description,
          resData.year,
          resData.country,
          resData.genre,
          resData.numberOfSeasons,
          resData.averageDuration,
          resData.fetchedUserId,
          resData.grade,
          resData.peopleRated
        );
      })
    );

  }

  deleteRating(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .delete(`https://movies-app-6bff9.firebaseio.com/ratings/${id}.json?auth=${token}`);
      }),
      switchMap(() => {
        return this.ratings;
      }),
      take(1),
      tap((ratings) => {
        this._ratings.next(ratings.filter((r) => r.id !== id));
      })
    );
  }

  deleteShow(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .delete(`https://movies-app-6bff9.firebaseio.com/series/${id}.json?auth=${token}`);
      }),
      switchMap(() => {
        return this.series;
      }),
      take(1),
      tap((series) => {
        this._series.next(series.filter((s) => s.id !== id));
      })
    );
  }

  editShow(show: Series) {

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .put(`https://movies-app-6bff9.firebaseio.com/series/${show.id}.json?auth=${token}`, 
            show
          );
      }),
      switchMap(() => this.series),
      take(1),
      tap((series) => {
        const updatedShowID = series.findIndex((s) => s.id === show.id);
        const updatedSeries = [...series];
        updatedSeries[updatedShowID] = show;
        this._series.next(updatedSeries);
      })
    );

  }
}
