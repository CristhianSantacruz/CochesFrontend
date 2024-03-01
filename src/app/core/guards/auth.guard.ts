import {ActivatedRouteSnapshot, CanActivateFn, Route, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from "../service/token.service";
import {inject} from "@angular/core";
import {Roles} from "../utils/Roles";


export const AuthGuardWithAuth: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  let tokenService:TokenService = inject(TokenService)
  let router : Router = inject(Router)
  if(tokenService.getToken()){
    router.navigateByUrl("/home/products")
    return false;
  }else{
    return true;
  }
};



export const AuthGuardWithoutAuth: CanActivateFn = (route, state) => {
  let tokenService:TokenService = inject(TokenService)
  let router : Router = inject(Router)
  if (!tokenService.getToken()) {
    console.log('No puede estar aqui')
    router.navigateByUrl('/authentication/login');
    return false;
  } else {

    return true;
  }
};

export const canActiveWithRolAdmin: CanActivateFn = () => {
  let tokenService:TokenService = inject(TokenService)
 if(tokenService.getToken()){
   if(tokenService.getInfoToken().rol !== "ADMIN"){
     console.log("No tienes permisos de estar aqui no es un admin!")
     return false;
   }
 }
  return true;
};
