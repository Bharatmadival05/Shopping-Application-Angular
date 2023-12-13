import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { CurrentcustomerComponent } from './currentcustomer/currentcustomer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NeworderComponent } from './neworder/neworder.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth.guard';
import { SortedProductListComponent } from './sorted-product-list/sorted-product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"products",component:ProductsComponent},
  {path:"login",component:LoginComponent},
  {path:"createcustomer",component:CreatecustomerComponent},
  {path:"orders",component:OrdersComponent},
  {path:"neworder",component:NeworderComponent},
  {path:"currentcustomer",component:CurrentcustomerComponent},
  {
    path: 'protected',
    component: CurrentcustomerComponent,
    canActivate: [AuthGuard], // Add the AuthGuard to protect this route
  },
  { path: 'sorted-category/:categoryId', component: SortedProductListComponent },
  {path: 'product-details/:proId', component: ProductDetailsComponent},
  {path:'neworder/:proId', component:NeworderComponent},
  {path:'search/:search',component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
