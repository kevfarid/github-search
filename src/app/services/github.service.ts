import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, filter } from 'rxjs';
import IUser from '../models/IUser';
import LocalStorage from '../utils/storage';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  apiUrl = 'https://api.github.com';
  searchUrl: string = `${this.apiUrl}/search/users`;

  constructor(private http: HttpClient) {}

  cacheUsers = new LocalStorage('github-users', {});

  generateLevel(users: IUser[]) {
    return users.map((user) => {
      let level = 'Unknow';

      if (user.score < 0.4) {
        level = 'Bajo';
      }

      if (user.score > 0.4 && user.score < 0.6) {
        level = 'Medio';
      }

      if (user.score > 0.6) {
        level = 'Alto';
      }

      return {
        ...user,
        level,
      };
    });
  }

  getUsersByWord(word: string) {
    return this.http
      .get<IRespose>(this.searchUrl, { params: { q: word, per_page: 100 } })
      .pipe(
        map((users) => {
          return users.items;
        }),
        map((users) => this.generateLevel(users))
      );
  }

  getAllUsers(word: string = '') {
    if (this.cacheUsers.find()) {
      return new Observable((observer) => {
        observer.next(this.cacheUsers.find());
      }).pipe(
        map((users: any) => this.generateLevel(users)),
        map((users: any) =>
          users.filter((user: IUser) =>
            user.login.toLowerCase().includes(word.toLowerCase())
          )
        )
      );
    }

    return this.http
      .get<IRespose>(`${this.apiUrl}/users`, {
        params: { per_page: 100 },
      })
      .pipe(
        map((users) => {
          this.cacheUsers.save(users);
          return users;
        })
      );
  }
}

interface IRespose {
  items: IUser[];
}
