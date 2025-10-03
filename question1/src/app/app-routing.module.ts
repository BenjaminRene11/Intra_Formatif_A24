import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { DogComponent } from './dog/dog.component';
import { guardConnecteGuard } from './guard/guard-connecte.guard';
import { guardCatGuard } from './guard/guard-cat.guard'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'cat', component: CatComponent, canActivate: [guardConnecteGuard, guardCatGuard] },
  { path: 'dog', component: DogComponent, canActivate: [guardConnecteGuard] },
  { path: 'home', component: HomeComponent, canActivate: [guardConnecteGuard] },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
