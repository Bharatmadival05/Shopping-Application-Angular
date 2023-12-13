import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search:any;

  constructor(
    private dataService:DataService,
    private router:Router,
    private productService:ProductService) { }

  ngOnInit():void {
  }

  isLoggedIn(): boolean {
    // Add your logic to check if the user is logged in
    // For example, check if there is data in local storage
    return !!localStorage.getItem('myData');
  }

  logout() {

    console.log('Logout button clicked.');
    // Clear the value from local storage
    localStorage.removeItem('myData');

    // Clear the data in the data service (optional, if needed)
    this.dataService.setData(null);

    this.dataService.triggerLogedUser();

    this.router.navigate(['/login'])
  }

  profile(){
    this.dataService.triggerLogedUser();
  }

  searchProducts(search:string){
    this.router.navigate(['/search',search]);
  }
}
