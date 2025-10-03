import { inject } from "@angular/core";
import { CanActivateFn, createUrlTreeFromSnapshot } from "@angular/router";
import { UserService } from "../user.service";
export const guardCatGuard: CanActivateFn = (route, state) => {
  if (!inject(UserService).isCatPrefered())
    // S'il n'aime pas les chats on le redirige vers la page de dog
    return createUrlTreeFromSnapshot(route, ["/dog"]);
  // S'il est connecté, tout est beau on continue!
  else return true;
};