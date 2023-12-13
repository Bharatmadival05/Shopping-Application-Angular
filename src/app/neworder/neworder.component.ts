import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';
import { Order } from './order';

@Component({
  selector: 'neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css']
})
export class NeworderComponent implements OnInit {
  orderObj: Order = new Order();
  productPrice: number = 0;
  totalOrderPrice: number = 0;
  proId: number;
  username: string;
  isReady: boolean = false;
  qty=1;

  constructor(
    private orderservice: OrderService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.proId = +params['proId']; // Convert route parameter to a number
      console.log('product id ', this.proId);
      // this.checkIsReady();
      this.getProductPrice();
    });

    this.dataService.data$.subscribe((newData) => {
      if (newData !== undefined && newData !== null) {
        this.username = newData;
        console.log('Username:', this.username);
        // this.checkIsReady();
      } else {
        // Handle the case where username is not available
        console.log('Username is not available');
        // You can set isReady to false or handle it in a way that fits your requirements
      }
    });

    this.orderObj.qty=1;
    this.calculateTotalPrice();
  }

  ngOnInit(){
    this.calculateTotalPrice();
  }

  // checkIsReady() {
  //   if (this.proId !== undefined && this.username !== undefined) {
  //     this.isReady = true;
  //   }
  // }

  getProductPrice() {
    // if (this.isReady) {
      const productId = this.proId;
      this.productService.getProductPrice(productId).subscribe(
        (price: number) => {
          console.log('Product Price:', price);
          this.productPrice = price;
          this.calculateTotalPrice();
        },
        (error) => {
          console.log('Error fetching product price:', error);
        }
      );
    // }
  }

  calculateTotalPrice() {
    // if (this.isReady) {
      const quantity = this.orderObj.qty;
  
      // Handle the case where quantity is zero
      if (quantity === 0) {
        this.totalOrderPrice = 0;
      }else if(this.productPrice === 1){
        this.totalOrderPrice = this.productPrice;
      }
       else if (this.productPrice && quantity) {
        this.totalOrderPrice = this.productPrice * quantity;
      } else {
        // Handle other cases (e.g., productPrice is not available)
        this.totalOrderPrice = this.productPrice;
      }
  
      console.log('Total Price:', this.totalOrderPrice);
    // }
  }
  

  placeOrder() {
    // if (this.isReady) {
      // Calculate total price before placing the order
      this.calculateTotalPrice();

      // Include total price in the order object
      this.orderObj.orderprice = this.totalOrderPrice;
      this.orderObj.customerusername=this.username;
      this.orderObj.productid=this.proId;
      this.orderObj.status='Ordered';
      this.orderObj.orderTime = new Date().toISOString();

      // Call your order service with the order object
      this.orderservice.addOrder(this.orderObj).subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
      alert('Order Placed');
      this.router.navigate(['/orders']);
    // }
  }


  decreaseQty() {
    if (this.orderObj.qty > 1) {
      this.orderObj.qty--;
      this.getProductPrice();
    }
  }
  
  increaseQty() {
    this.orderObj.qty++;
    this.getProductPrice();
  }
  
  
}
