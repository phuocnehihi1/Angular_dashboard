import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../services/user.service';

export class userGuard implements CanActivate, CanActivateChild {
  constructor(private user: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.user.isToken()) {
      console.log('Check canActive in guard', this.user.isToken());
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log();
    if (this.user.getInforLogin().id == '1') {
      return true;
    } else return false;
  }
}
