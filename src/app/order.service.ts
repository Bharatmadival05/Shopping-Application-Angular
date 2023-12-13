import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ordersurl="http://localhost:8080/getOrders";
  private neworder="http://localhost:8080/addOrders";
  private userorderurl="http://localhost:8080/userorders";
  private updateorder="http://localhost:8080/updateorder";

  constructor(private http:HttpClient) { }

  getOrderList(): Observable<any>{
    return this.http.get(this.ordersurl);
  }

  addOrder(order: Object):Observable<Object>{
    return this.http.post(`${this.neworder}`,order);
  }

  userOrder(username: String): Observable<any>{
    return this.http.get(`${this.userorderurl}/${username}`);
  }

  updateOrder(orderid: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.updateorder}/${orderid}/${status}`, {});
  }
  
}
