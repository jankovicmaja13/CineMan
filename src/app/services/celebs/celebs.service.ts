import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Actor } from 'src/app/model/actor.model';
import { Role } from 'src/app/model/role.model';
import { Genre } from 'src/app/model/genre.model';
import { Movie } from 'src/app/model/movie.model';

export interface ActorData {
  name: string;
  aka: string;
  biography: string;
  dateOfBirth: Date;
  country: string;
  height: number;
  image: string;
  userId: string;
  roles: Role[];
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
  grade: number;
  peopleRated: number;
  fetchedUserId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CelebService {
  // tslint:disable-next-line: variable-name
  private _actors = new BehaviorSubject<Actor[]>([]);
  // tslint:disable-next-line: variable-name
  private _movies = new BehaviorSubject<Movie[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) { }

  get actors() {
    return this._actors.asObservable();
  }
  get movies() {
    return this._movies.asObservable();
  }

  getActors() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: ActorData }>(
            `https://movies-app-6bff9.firebaseio.com/actor.json?auth=${token}`
          );
      }),
      map((response) => {
        console.log(response);
        const actors: Actor[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            actors.push(
              new Actor(
                key,
                response[key].name,
                response[key].aka,
                response[key].biography,
                response[key].dateOfBirth,
                response[key].country,
                response[key].height,
                response[key].image,
                response[key].userId,
                response[key].roles
              ));
          }
        }
        return actors;
      }),
      tap(actors => {
        this._actors.next(actors);
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
                moviesData[key].peopleRated,
                

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

  addActor(actor: Actor) {
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

        actor.userId = fetchedUserId;
        return this.http
          .post<{ name: string }>(
            `https://movies-app-6bff9.firebaseio.com/actor.json?auth=${token}`,
            actor
          );
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.actors;
      }),
      take(1),
      tap((actors) => {
        actor.id = generatedId;
        this._actors.next(
          actors.concat(actor)
        );
      })
    );
  }
  getActor(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<ActorData>(`https://movies-app-6bff9.firebaseio.com/actor/${id}.json?auth=${token}`);
      }),
      map((resData) => {
        console.log(resData);
        return new Actor(
          id,
          resData.name,
          resData.aka,
          resData.biography,
          resData.dateOfBirth,
          resData.country,
          resData.height,
          resData.image,
          resData.userId,
          resData.roles
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
          resData.peopleRated,
          
        );
      })
    );

  }

  deleteActor(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .delete(`https://movies-app-6bff9.firebaseio.com/actor/${id}.json?auth=${token}`);
      }),
      switchMap(() => {
        return this.actors;
      }),
      take(1),
      tap((actors) => {
        this._actors.next(actors.filter((a) => a.id !== id));
      })
    );
  }

  editActor(actor: Actor) {

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .put(`https://movies-app-6bff9.firebaseio.com/actor/${actor.id}.json?auth=${token}`,
            actor
          );
      }),
      switchMap(() => this.actors),
      take(1),
      tap((actors) => {
        const updatedActorID = actors.findIndex((m) => m.id === actor.id);
        const updatedActors = [...actors];
        updatedActors[updatedActorID] = actor;
        this._actors.next(updatedActors);
      })
    );

  }
}
