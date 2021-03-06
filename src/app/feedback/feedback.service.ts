import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Message } from './message';
import { Observable } from 'rxjs/Rx';
import { getRef } from 'angularfire2/database/utils';


@Injectable()
export class FeedbackService {
  private repo$: AngularFireList<any>;
  private ratings$: AngularFireList<any>;

  constructor(private database: AngularFireDatabase,
              private router: Router) {
    this.repo$ = this.database.list('/feedback');
    this.ratings$ = this.database.list('/ratings');
  }

  // Get a stream of messages filtered by href (of a message)
  getMessages(activatedRoute: ActivatedRoute): Observable<Message[]> {
    const stream$ = this.repo$.valueChanges()
      .switchMap((results: Message[]) =>
        Observable.of(results.filter(m => m.href === this.router.url).filter(m => !m.isDone).sort())
      );
    return activatedRoute.url.switchMap(urls => stream$);
  }

  addMessage(name: string, email: string, comment: string, header?: string): any {
    const message = {
      name,
      email,
      comment,
      header,
      timestamp: new Date().toUTCString(),
      href: this.router.url
    };
    return this.repo$.push(message);
  }

  getRatings(): Observable<any[]> {
    return this.ratings$.valueChanges();
  }

  addRating(lesson: string, rating: string) {
    const path = 'ratings/' + lesson;
    getRef(this.database.app, path).transaction(ratings => {
      if (ratings == null) {
        ratings = {
          lesson: lesson
        };
      }
      const count = ratings[rating] || 0;
      ratings[rating] = count + 1;
      return ratings;
    });
  }

}
