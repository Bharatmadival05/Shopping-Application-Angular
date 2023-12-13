import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { DataService } from '../data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AdminService } from '../admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('formAnimation', [
      state('login', style({ transform: 'translateX(4px)' })),
      state('admin', style({ transform: 'translateX(-105%)' })),
      transition('login <=> admin', animate('0.5s ease-in-out')),
    ]),
  ],  
})
export class LoginComponent implements OnInit {

  data: any = {};
  admin:any={};
  getresult: boolean;
  loggedInUsername: string;
  user:string;
  currentcustomer:Observable<any>

  formState: 'login' | 'admin' = 'login';

  passwordVisible = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private dataService: DataService,
    private adminService: AdminService
  ) { }

  ngOnInit() {}

  toggleForm(form: 'login' | 'admin'): void {
    this.formState = form;
  }

  loginUser(): void {
    var username = this.data.username;
    var password = this.data.password;

    this.customerService.getCustomerLoginDetails(username, password)
      .subscribe((res: boolean) => {
        this.currentcustomer=this.customerService.currentCustomer(username);
        this.currentcustomer.subscribe((customerData)=>{
          console.log('customer boy',customerData);

          const extractedUsername = customerData.username;
          this.user= extractedUsername;
          console.log(this.user);
          console.log('Extracted Username:', extractedUsername);
          this.dataService.setData(this.user);
        })
        this.getresult = res;
        if (this.getresult == true) {
          alert("Login Successful " + username)
          this.loggedInUsername = username;
          this.router.navigate(['/']);
          
        } else {
          alert("Invalid login")
        }
      });
  }

  loginAdmin():void{
    var admin = this.admin.username;
    var pass = this.admin.password;

    this.adminService.getadminDetails(admin, pass)
    .subscribe((res:boolean)=>{
      this.getresult=res;
      if(this.getresult==true){
        alert("Login Successful " + admin);
      }else {
        alert("Invalid login")
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
