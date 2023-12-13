import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject=new BehaviorSubject<string | null>(null);
  data$= this.dataSubject.asObservable();
  private loggedInUsernameSource = new BehaviorSubject<string>('');
  currentLoggedInUsername = this.loggedInUsernameSource.asObservable();

  constructor() {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      this.dataSubject.next(storedData);
    }
   }

   setData1(username: string) {
    this.loggedInUsernameSource.next(username);
  }

  setData(newData:string){
    this.dataSubject.next(newData);
    // Store data in local storage
    localStorage.setItem('myData', newData);
  }

  triggerLogedUser() {
    this.dataSubject.next(this.dataSubject.value); // You can use any value here
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('myData');
  }

}
