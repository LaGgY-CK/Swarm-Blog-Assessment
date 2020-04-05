import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {

  constructor() { }

  /**
   * Intercept all http requests
   * We add the Bearer token in the headers
   * @param req HttpRequest<any>
   * @param next HttpHandler
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      return this.setBearerTokenInReq(req, next, true);
  }

  /**
   * Get Bearer token and add it to the HttpRequest Headers
   * @param req HttpRequest<any>
   * @param next HttpHandler
   * @param retry boolean
   */
  private setBearerTokenInReq(req: HttpRequest<any>, next: HttpHandler, retry: boolean):
    Observable<HttpEvent<any>> {

    // Get locally stored header
    return this.getBearerToken(next).pipe(
      switchMap(bearerToken => {
        // Add it
        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + bearerToken) });
        return next.handle(req).pipe(
          // If the token has expired, clear it, and set it up again, rerun the function
          catchError((error: HttpErrorResponse) => {
            if (error.status == 401 || error.status == 403) {
              clearBearerToken();
              return this.setBearerTokenInReq(req, next, false);
              // Otherwise we throw the error
            } else {
              return throwError(error);
            }
          })
        );
      })
    );
  }

  /**
   * Get Bearer Token from localstorage or from squidex
   * @param next HttpHandler
   */
  private getBearerToken(next: HttpHandler) {
    const bearerToken = localStorage.getItem('token');
    if (bearerToken) {
      return of(bearerToken);
    }
    const url = environment.squidex_url + '/identity-server/connect/token';
    const body = new FormData();

    body.set('grant_type', 'client_credentials');
    body.set('client_id', environment.client_id);
    body.set('client_secret', environment.client_secret);
    body.set('scope', 'squidex-api');

    const tokenRequest = new HttpRequest('POST', url, body, { responseType: 'json' });

    return next.handle(tokenRequest).pipe(
      filter(r => r instanceof HttpResponse),
      map((res: HttpResponse<any>) => {
        const bToken = res.body.access_token;
        setBearerToken(bToken);
        return bToken;
      })
    );
  }
}

/**
 * Store the token locally
 * @param token string
 */
function setBearerToken(token: string) {
  localStorage.setItem('token', token);
}

/**
 * Delete the locally stored token
 */
function clearBearerToken() {
  localStorage.removeItem('token');
}
