import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { Products } from '../products/products';


@Component({
  selector: 'sorted-category',
  templateUrl: './sorted-product-list.component.html',
  styleUrls: ['./sorted-product-list.component.css']
})
export class SortedProductListComponent implements OnInit{
  sortedProducts:Products[]=[];
  categoryId:number=1;
  product:Observable<Products[]>;

  constructor(private productService:ProductService,private route: ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['categoryId']) {
        this.categoryId = +params['categoryId'];
        this.getProductsByCategory(this.categoryId);
      } else {
        // If there's no category ID in the route parameters, you can handle it here
      }
    });
    this.fetchAllProducts();
  }
 
  getProductsByCategory(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId)
      .subscribe((products: Products[]) => {
        this.sortedProducts = products;
        console.log('Sorted Products:', this.sortedProducts);
      });
  }

  fetchAllProducts() {
    this.product=this.productService.getProductList()
}

  nevigatetoSortedProducts(productId:number):void{
    this.router.navigate(['/product-details',productId]);
    console.log('Navigate to Product',productId);
  }

  navigateToProductDetails(proId: number) {
    this.router.navigate(['/product-details', proId]);
    console.log('product Id '+proId)
  }
}
