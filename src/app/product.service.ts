import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Products } from './products/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private categoryurl="http://localhost:8080/getProductsByCategory"
  private productsurl="http://localhost:8080/getProducts";
  private productPriceUrl="http://localhost:8080/productprice";
  private productdetailsurl="http://localhost:8080/productdetails";
  private productcategory="http://localhost:8080/productcategory";
  private searchproduct="http://localhost:8080/search";

  products: Products[]=[];
  constructor(private http: HttpClient,
              private productService : ProductService) {
               }

  getProductList(): Observable<any>{
    return this.http.get(this.productsurl);
  }

  getAllProducts(): Observable<Products[]> {
    return this.productService.getProductList();
  }

  getProductsByCategory(categoryId: number): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.categoryurl}/${categoryId}`);
  }

  getProductPrice(productId: number): Observable<number> {
    return this.http.get<number>(`${this.productPriceUrl}/${productId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        return throwError('Something bad happened; please try again later.');
      })
    );
  }
  
  getProductDetails(proId:number): Observable<Products[]>{
    return this.http.get<Products[]>(`${this.productdetailsurl}/${proId}`);
  }

  getProductCategory(): Observable<any>{
    return this.http.get(this.productcategory);
  }

  getSearchProduct(search:string): Observable<Products[]>{
    return this.http.get<Products[]>(`${this.searchproduct}/${search}`);
  }
}
