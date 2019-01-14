import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, asyncScheduler } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { catchError, finalize, tap, observeOn } from 'rxjs/operators';

@Injectable()
export class NetworkStatus {
  private requestInFlight$: BehaviorSubject<boolean>;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class NetworkStatusInterceptor implements HttpInterceptor {
  constructor(private status: NetworkStatus) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      observeOn(asyncScheduler),
      tap(() => this.status.setHttpStatus(true)),
      catchError(error => throwError(error)),
      finalize(() => this.status.setHttpStatus(false)),
    );
  }
}
