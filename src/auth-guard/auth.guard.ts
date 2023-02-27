import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginPageService } from 'src/app/service/login-page.service';


@Injectable({
  providedIn: 'root',
})



export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: LoginPageService
  ) {


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if(this.service.logIn())
    return true;
  }

}
