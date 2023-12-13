import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { Products } from '../products/products';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: Products[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      const search = params['search'];
      this.getProductdetails(search);
    });
  }

  getProductdetails(search: string): void {
    
    this.productService.getSearchProduct(search).subscribe(
      (products: Products[]) => {
        this.products = products;
        console.log('hiiiiii',this.products)
      },
      (error) => {
        console.log('Error fetching search products:', error);
      }
    );
  }

  navigateToProductDetails(proId: number) {
    this.router.navigate(['/product-details', proId]);
    console.log('product Id '+proId)
  }
}
