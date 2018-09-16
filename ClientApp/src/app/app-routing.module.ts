import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth/auth.guard';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserComponent } from './user/user/user.component';
import { UserResolver } from './_resolvers/user.resolver';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { EditUserResolver } from './_resolvers/edit-user.resolver';


const routes: Routes = [
    { path: '', component: WelcomeComponent}, // empty part is the root route
    { path: 'user/edit', component: EditUserComponent, resolve: {user: EditUserResolver}},
    { path: 'users', component: UserListComponent},
    // the resolver allows to load the data before routed to a route
    { path: 'user/:userName', component: UserComponent, resolve: {user: UserResolver}},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    // { path: 'testcore', component: WebapitestComponent, canActivate: [AuthGuard]},
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]}, // return this to enable the guard on products routing
    // { path: 'products', component: ProductsComponent},
    { path: '**', redirectTo: '', pathMatch: 'full'} // as long as the domain is ok, even if path doesn't exist, just redirect home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
