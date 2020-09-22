// https://jasonwatmore.com/post/2020/07/18/angular-10-fake-backend-example-for-backendless-development

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, ObservableInput, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handle))
      // call materialize and dematerialize to ensure delay even
      // if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(3000))
      .pipe(dematerialize());

    function handle(): ObservableInput<any> {
      const data: FormData = request.body;
      return ok(data.get('file'));
    }

    function ok(body?): ObservableInput<any> {
      return of(new HttpResponse({ status: 200, body }));
    }
  }
}


export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
