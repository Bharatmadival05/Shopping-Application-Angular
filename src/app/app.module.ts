import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { OrdersComponent } from './orders/orders.component';
import { NeworderComponent } from './neworder/neworder.component';
import { CurrentcustomerComponent } from './currentcustomer/currentcustomer.component';
import { SortedProductListComponent } from './sorted-product-list/sorted-product-list.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ProductsComponent,
    HomeComponent,
    LoginComponent,
    CreatecustomerComponent,
    OrdersComponent,
    NeworderComponent,
    CurrentcustomerComponent,
    SortedProductListComponent,
    ProductCategoryComponent,
    ProductDetailsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
