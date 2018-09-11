import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleTableComponent } from './examples/example-table/example-table.component';
import { ExampleDashboardComponent } from './examples/example-dashboard/example-dashboard.component';

import {WelcomeComponent} from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth/auth.guard';
import { WebapitestComponent } from './examples/webapitest/webapitest.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent}, // empty part is the root route
    { path: 'table', component: ExampleTableComponent, canActivate: [AuthGuard]},
    { path: 'dash', component: ExampleDashboardComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'testcore', component: WebapitestComponent, canActivate: [AuthGuard]},
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]}, // return this to enable the guard on products routing
    // { path: 'products', component: ProductsComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full'} // as long as the domain is ok, even if path doesn't exist, just redirect home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
