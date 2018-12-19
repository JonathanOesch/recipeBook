import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot,
  RouterStateSnapshot, 
  Router, 
  CanLoad,
  Route } from '@angular/router';

// Services
import { AuthService } from '../../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  canLoad ( route: Route ) {
    if ( !this.authService.isAuthenticated() ) {
      this.router.navigate( [ '/signin' ] );
    }
    return this.authService.isAuthenticated();
  }

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isAuthenticated()){
      this.router.navigate(['/signin']);
    }
    return this.authService.isAuthenticated();
  }

  
}
