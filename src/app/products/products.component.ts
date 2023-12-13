import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { Products } from './products';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product:Observable<Products[]>;
  

  constructor(private productservice:ProductService,private router:Router) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
   this.product= this.productservice.getProductList();
   console.log("Backend Product :",this.product);
  }

  navigateToProductDetails(proId: number) {
    this.router.navigate(['/product-details', proId]);
    console.log('product Id'+proId)
  }
}
