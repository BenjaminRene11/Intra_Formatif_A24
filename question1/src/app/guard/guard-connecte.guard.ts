import { inject } from "@angular/core";
import { CanActivateFn, createUrlTreeFromSnapshot } from "@angular/router";
export const guardConnecteGuard: CanActivateFn = (route, state) => {
  if (!isLogged()){
    // S'il n'est pas connecté on le redirige vers la page de login
    return createUrlTreeFromSnapshot(route, ["/login"]);
   }
    
  // S'il est connecté, tout est beau on continue!
  else return true;
};

function isLogged() {
    if (localStorage.getItem("user") != null){
      return true
    }
    console.log("CA MARCHE WOOOHOOO!!!!!!!!!!!!!!")
    return false
  }
