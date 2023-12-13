import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { OrderService } from '../order.service';
import { Orders } from './orders';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Observable<Orders[]>;
  logedInUsername: any;

  constructor(private orderservice: OrderService, private dataService: DataService,
   private router:Router) { }

  ngOnInit() {
    this.dataService.data$.subscribe((newData1) => {
      this.logedInUsername = newData1;
      console.log("yaroo",newData1);
      console.log("Welcome " + this.logedInUsername);
      this.getAllOrders();
    });
  }

  navigateToNewOrder() {
    // Use the router to navigate to the NeworderComponent and pass the username as a query parameter
    this.router.navigate(['/neworder'], { queryParams: { username: this.logedInUsername } });
  }

  getAllOrders() {
    if (this.logedInUsername) {
      // Call a method from OrderService to fetch orders
      this.orders = this.orderservice.userOrder(this.logedInUsername)
      this.orders.subscribe((orderData) => {
        console.log('Backend order:', orderData);
      });
    }
  }


  cancelOrder(orderId:number){
    this.orderservice.updateOrder(orderId, 'Cancelled').subscribe(()=>{
      this.getAllOrders();
    })
  }
}
