// product-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Products } from '../products/products';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productDetails: Products[]=[];
  proId:number

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const proId = +params['proId']; // Convert route parameter to a number
      this.getProductDetails(proId);
    });
  }

  getProductDetails(proId: number) {
    console.log(proId)
    this.productService.getProductDetails(proId).subscribe(
      (productDetails: Products[]) => {
        this.productDetails = productDetails;
        console.log('Product Details:', this.productDetails);
      },
      (error) => {
        console.log('Error fetching product details:', error);
      }
    );
  }

  navigateToNewOrder(proId:number) {
    // Use queryParams to pass the proId
    this.router.navigate(['/neworder',proId]);
    console.log('id ',proId)
  }
}
