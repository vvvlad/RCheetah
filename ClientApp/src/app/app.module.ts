import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Material imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ExampleTableComponent } from './examples/example-table/example-table.component';
import { ExampleDashboardComponent } from './examples/example-dashboard/example-dashboard.component';
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
import { WebapitestComponent } from './examples/webapitest/webapitest.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { WebService } from './web.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ExampleTableComponent,
    ExampleDashboardComponent,
    WelcomeComponent,
    SignupComponent,
    LoginComponent,
    ProductsComponent,
    AddProductComponent,
    ProductDetailsComponent,
    AddProductDialogComponent,
    AllProductsComponent,
    WebapitestComponent,
    WebapitestComponent,
    MessagesComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [AuthService, ProductsService, WebService],
  bootstrap: [AppComponent],
  entryComponents: [AddProductDialogComponent]
})
export class AppModule { }
