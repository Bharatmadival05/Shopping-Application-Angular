import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from './customer';

@Component({
  selector: 'createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreatecustomerComponent implements OnInit {

  customerObj: Customer=new Customer();
  data1:any = {};
  getresult: boolean;
  selectedImage:File;

  constructor(private customerService: CustomerService,
   private router:Router) { }
  

  ngOnInit() {
    this.customerObj=new Customer();
  }

  signUpCustomer() {
    var username = this.data1.username;
    var password = this.data1.password;
  
    this.customerService.getCustomerLoginDetails(username, password)
      .subscribe(
        (res:boolean) => {
          this.getresult = res;
          if (this.getresult == false) {
            console.log(this.customerObj.custmerid);
            this.customerService.addCustomer(this.customerObj)
              .subscribe(
                (data) => {
                  console.log("Data inserted successfully:", data);
                  alert("Registration successful");
                  this.router.navigate(['/login']);
                },
                (error) => {
                  console.log("Error during registration:", error);
                  alert("Error occurred during registration");
                }
              );
          } else {
            alert("User already exists");
          }
        },
        (error) => {
          console.log("Error:", error);
          alert("Error occurred during login"); // Handle the error here
        }
      );
  }

  
  onImageChange(event: any) {
    this.selectedImage = event.target.files[0];
    this.encodeImageToBase64();
  }

  encodeImageToBase64() {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.customerObj.custimgString = event.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }
  
}
