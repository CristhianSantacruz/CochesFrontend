import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from "../service/token.service";
import {inject} from "@angular/core";
import {error} from "@angular/compiler-cli/src/transformers/util";

export const AuthGuardWithAuth: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  let tokenService: TokenService = inject(TokenService);
  let router: Router = inject(Router);
  if(tokenService.getToken()){
    router.navigateByUrl("/home/products")
    return false;
  }else{
    return true;
  }
};

export const AuthGuardWithoutAuth: CanActivateFn = (route, state) => {
  let tokenService = inject(TokenService)
  let router = inject(Router)


  if (!tokenService.getToken()) {
    console.log('No puede estar aqui')
    router.navigateByUrl('/authentication/login');
    return false;
  } else {

    return true;
  }
};

