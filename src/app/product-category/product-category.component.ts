import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { ProductCategory } from './procat';
import { Products } from './products';

@Component({
  selector: 'productcategory',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  product:Observable<Products>;
  category:Observable<ProductCategory>;
  
  constructor(private productService : ProductService, private router:Router) { }
  ngOnInit() {
    this.fetchAllProducts();
    this.getAllCategoryProducts();
  }

  fetchAllProducts() {
    this.product=this.productService.getProductList()
    }

    getAllCategoryProducts(){
      this.category= this.productService.getProductCategory();
      this.category.subscribe(data => {
        console.log("Product Category :", data);
      });
    }

navigateToSortedCategory(proCatId: number): void {
  this.router.navigate(['/sorted-category', proCatId]);
  console.log('Navigating to category:', proCatId);
}
}