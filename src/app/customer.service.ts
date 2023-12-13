import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './currentcustomer/customer';
import { Customers } from './currentcustomer/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}
   private loginurl="http://localhost:8080/customer/";
   private signupurl="http://localhost:8080/addcustomer";
   private currentcustomers="http://localhost:8080/currentcustomer/";
   private updatecustomer="http://localhost:8080/updatecustomer";

   getCustomerLoginDetails(username, password){
    return this.http.get(this.loginurl + username + '/' + password);
    //localhost:8080/customer/Bharat/1234
   }

   addCustomer(customer: Object): Observable<any>{
    return this.http.post(`${this.signupurl}`,customer);
   }

   currentCustomer(username):Observable<Customer>{
    return this.http.get<Customer>(this.currentcustomers+username);
    //localhost:8080/currentcustomer/subbu123
   }

   updateCustomer(customer:Object):Observable<any>{
    return this.http.put(`${this.updatecustomer}`,customer);
   }
}
