import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http:HttpClient) { }
  private adminurl='http://localhost:8080/admin/';
  private producturl='http://localhost:8080/addProducts'



  getadminDetails(username,password){
    return this.http.get(this.adminurl+username+'/'+password);
  }

  addProducts(product:Object):Observable <any>{
    return this.http.post(`${this.producturl}`,product);
  }
}
