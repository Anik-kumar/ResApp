// basic-auth-interceptor
import { AuthService } from '../services/auth.service';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private toastrService: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.authService.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    console.log('authToken: ', authToken);
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      tap(
        event => {
        if (event instanceof HttpResponse) {
          this.authService.setAuthorizationToken(event.headers.get('x-auth-token'));
          }
        },
        error => {
          console.log('Error in AuthInterceptor ', error);
        }));
  }
}
