import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponseI } from 'src/app/model/login-response';
import { UserI } from 'src/app/model/user.interface';
import { environment } from 'src/environments/environment';

const endPoint = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private snackbar: MatSnackBar, private jwtService: JwtHelperService) { }

  login(user: UserI): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>(endPoint+'/users/login', user).pipe(
      tap((res: LoginResponseI) => localStorage.setItem('nestjs_chat_app', res.access_token)),
      tap(() => this.snackbar.open('Login successfull', 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      }))
    );
  }

  getLoggedInUser() {
    const decodedToken = this.jwtService.decodeToken();
    return decodedToken.user;
  }

}
