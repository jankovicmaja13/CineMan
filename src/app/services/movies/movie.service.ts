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

interface GenreData {
  name: string;
}

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

export interface RatingData{
  user: string;
  movieID: string;
  rate: number;
}

export interface CategoryData{
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // tslint:disable-next-line: variable-name
  private _genres = new BehaviorSubject<Genre[]>([]);
  // tslint:disable-next-line: variable-name
  private _movies = new BehaviorSubject<Movie[]>([]);
  // tslint:disable-next-line: variable-name
  private _ratings = new BehaviorSubject<Rating[]>([]);
  // tslint:disable-next-line: variable-name
  private _categories = new BehaviorSubject<Category[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) { }

  get genres() {
    return this._genres.asObservable();
  }

  get movies() {
    return this._movies.asObservable();
  }
  get ratings() {
    return this._ratings.asObservable();
  }
  get categories() {
    return this._categories.asObservable();
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

  getMovies() {
    console.log('getMovies service');
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: MovieData }>(
            `https://movies-app-6bff9.firebaseio.com/movie.json?auth=${token}`
          );
      }),
      map((moviesData) => {
        console.log(moviesData);
        const movies: Movie[] = [];
        for (const key in moviesData) {
          if (moviesData.hasOwnProperty(key)) {
            movies.push(
              new Movie(
                key,
                moviesData[key].name,
                moviesData[key].producer,
                moviesData[key].image,
                moviesData[key].description,
                moviesData[key].year,
                moviesData[key].country,
                moviesData[key].genre,
                moviesData[key].budget,
                moviesData[key].duration,
                moviesData[key].fetchedUserId,
                moviesData[key].grade,
                moviesData[key].peopleRated

              ));
          }
        }
        return movies;
      }),
      tap(movies => {
        this._movies.next(movies);
      })
    );

  }

  getCategories() {
    console.log('getCategories service');
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: CategoryData }>(
            `https://movies-app-6bff9.firebaseio.com/category.json?auth=${token}`
          );
      }),
      map((categoryData) => {
        console.log(categoryData);
        const categories: Category[] = [];
        for (const key in categoryData) {
          if (categoryData.hasOwnProperty(key)) {
            categories.push(
              new Category(
                key,
                categoryData[key].name
              ));
          }
        }
        return categories;
      }),
      tap(categories => {
        this._categories.next(categories);
      })
    );

  }

  addMovie(movie: Movie) {
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

        movie.userId = fetchedUserId;
        console.log(movie.genre.name);
        return this.http
          .post<{ name: string }>(
            `https://movies-app-6bff9.firebaseio.com/movie.json?auth=${token}`,
            movie
          );
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.movies;
      }),
      take(1),
      tap((movies) => {
        movie.id = generatedId;
        this._movies.next(
          movies.concat(movie)
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

  getMovie(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<MovieData>(`https://movies-app-6bff9.firebaseio.com/movie/${id}.json?auth=${token}`);
      }),
      map((resData) => {
        console.log(resData);
        return new Movie(
          id,
          resData.name,
          resData.producer,
          resData.image,
          resData.description,
          resData.year,
          resData.country,
          resData.genre,
          resData.budget,
          resData.duration,
          resData.fetchedUserId,
          resData.grade,
          resData.peopleRated
        );
      })
    );

  }

  deleteMovie(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .delete(`https://movies-app-6bff9.firebaseio.com/movie/${id}.json?auth=${token}`);
      }),
      switchMap(() => {
        return this.movies;
      }),
      take(1),
      tap((movies) => {
        this._movies.next(movies.filter((m) => m.id !== id));
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

  editMovie(movie: Movie) {

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .put(`https://movies-app-6bff9.firebaseio.com/movie/${movie.id}.json?auth=${token}`, 
            movie
          );
      }),
      switchMap(() => this.movies),
      take(1),
      tap((movies) => {
        const updatedMovieID = movies.findIndex((m) => m.id === movie.id);
        const updatedMovies = [...movies];
        updatedMovies[updatedMovieID] = movie;
        this._movies.next(updatedMovies);
      })
    );

  }
}
