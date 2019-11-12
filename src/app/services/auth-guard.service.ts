import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs/operators';
@Injectable()

export class AuthGuardService implements CanActivate {

auth: any = {};

constructor(private authService: AuthService, private router: Router) {

}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("login page");
    return this.authService.user.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn) {
          console.log('access denied');
          this.authService.loggedIn = false;
          this.router.navigate(['/login']);
        } else {
          this.authService.loggedIn = true;
          
        }
      }),
    );
  }
}