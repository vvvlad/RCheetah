import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Material imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddProductDialogComponent } from './products/add-product/add-product-dialog.component';
import { AuthService } from './auth/auth.service';
import { ProductsService } from './products/products.service';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './_services/error-interceptor.service';
import { UserService } from './_services/user.service';
import { UserListComponent } from './user/user-list/user-list.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { UserComponent } from './user/user/user.component';
import { UserResolver } from './_resolvers/user.resolver';


// this is for sending the jwt with every request

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    WelcomeComponent,
    SignupComponent,
    LoginComponent,
    ProductsComponent,
    AddProductComponent,
    ProductDetailsComponent,
    AddProductDialogComponent,
    AllProductsComponent,
    UserListComponent,
    UserComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.apiDomain],
        blacklistedRoutes: [environment.apiDomain + '/auth']
      }
    })
  ],
  exports: [
  ],
  providers: [AuthService, ProductsService, ErrorInterceptorProvider, UserService, UserResolver],
  bootstrap: [AppComponent],
  entryComponents: [AddProductDialogComponent]
})
export class AppModule { }
