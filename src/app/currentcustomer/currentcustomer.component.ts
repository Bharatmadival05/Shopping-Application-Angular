import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { DataService } from '../data.service';
import { Customer } from './customer';
import { Customers } from './customers';



@Component({
  selector: 'currentcustomer',
  templateUrl: './currentcustomer.component.html',
  styleUrls: ['./currentcustomer.component.css']
})
export class CurrentcustomerComponent implements OnInit {

  custobj: Customers = new Customers();
  customerObj: Customer = new Customer();
  currentcustomer: Observable<any>;
  logedInUsername: any;
  showEditForm = false;
  selectedImage: File;
  imageFile: File;
  custimgStringVariable: string = '';
  imageDataURL: string;

  constructor(private dataService: DataService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.dataService.data$.subscribe((newData) => {
      this.logedInUsername = newData;
      console.log("Welcome " + this.logedInUsername);
      this.logedUser()
    });
  }

  logedUser() {
    // Ensure this method is called when the loggedInUsername changes
    console.log('Data:', this.logedInUsername); // Log the value of this.data
    if (this.logedInUsername !== null && this.logedInUsername !== undefined) {
      this.currentcustomer = this.customerService.currentCustomer(this.logedInUsername);
      this.currentcustomer.subscribe((customerData) => {
        console.log('Backend customer:', customerData);
        if (customerData && customerData.custimgString) {
          this.custimgStringVariable = customerData.custimgString;

          const [, format, base64] = this.custimgStringVariable.match(/^data:image\/(\w+);base64,(.+)$/);

          const byteCharacters = atob(base64);
          const byteNumbers = new Array(byteCharacters.length);

          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: `image/${format}` });

          // Create a File object from the Blob
          this.imageFile = new File([blob], `image.${format}`, { type: `image/${format}` });
          console.log('Koi',this.imageFile)

          // Convert File object to data URL
          this.fileToDataURL(this.imageFile).then((dataURL) => {
            this.imageDataURL = dataURL;
          });

        }
      })
    } else {
      // Handle the case where data is null (e.g., after logout)
      this.currentcustomer = null;
    }
  }

  fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  updateUser() {
    this.customerService.updateCustomer(this.custobj)
      .subscribe((data) => {
        console.log("Customer updated successfully:", data);
        alert("Customer Updated");
      },
        (error) => {
          console.log("Error during updation:", error);
          alert("Error during updation");
        }
      );
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }




  onImageChange(event: any) {
    this.selectedImage = event.target.files[0];
    this.encodeImageToBase64();
  }

  encodeImageToBase64() {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.custobj.custimgString = event.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  // updateUser() {
  //   if (this.selectedImage!==null ||this.selectedImage===null) {
  //     const formData = new FormData();
  //     this.custobj.custimg=this.selectedImage;

  //     const custmerid = String(this.custobj.custmerid) ;
  //   const pincode = String(this.custobj.pincode);
  //   const contact =String(this.custobj.contactNo);

  //     // Add other customer details to the FormData if needed
  //     if (custmerid !== undefined && custmerid!==null && custmerid!=='') {
  //       formData.append('custmerid', custmerid);
  //     }
  //     if (this.custobj.customerName !== undefined && this.custobj.customerName !==null && this.custobj.customerName !== '') {
  //       formData.append('customerName', this.custobj.customerName);
  //     }
  //     if (this.custobj.gender !== undefined && this.custobj.gender !== null&&this.custobj.gender !== '') {
  //       formData.append('gender', this.custobj.gender);
  //     }
  //     if (contact !== undefined &&contact !==null&& contact !=='') {
  //       formData.append('contactNo', contact);
  //     }
  //     if (this.custobj.email !== undefined &&this.custobj.email !==null&&this.custobj.email !=='') {
  //       formData.append('email', this.custobj.email);
  //     }
  //     if (this.custobj.address !== undefined&&this.custobj.address !==null&&this.custobj.address !=='') {
  //       formData.append('address', this.custobj.address);
  //     }
  //     if (pincode !== undefined && pincode !== null&& pincode !=='') {
  //       formData.append('pincode',pincode);
  //     }
  //     if (this.custobj.username !== undefined &&this.custobj.username !==null&&this.custobj.username !=='') {
  //       formData.append('username', this.custobj.username);
  //     }
  //     if (this.custobj.password !== undefined&& this.custobj.password !==null&&this.custobj.password !=='') {
  //       formData.append('password', this.custobj.password);
  //     }
  //     if(this.custobj.custimg !== undefined&&this.custobj.custimg !==null){
  //       formData.append('file', this.custobj.custimg);
  //     }

  //     // Add more fields as needed

  //     // Call your service to upload the image along with other details
  //     this.customerService.updateCustomer(formData).subscribe(
  //       (response) => {
  //         console.log('Image uploaded successfully:', response);
  //         // Update other customer details if needed
  //         this.updateUser();
  //       },
  //       (error) => {
  //         console.error('Error uploading image:', error);
  //         try {
  //           const errorJson = JSON.parse(error.error);
  //           console.error('Server error:', errorJson);
  //         } catch (e) {
  //           console.error('Non-JSON response:', error.error);
  //         }
  //         // Handle error as needed
  //       }
  //     );
  //   }
  // }


  // updateUser() {
  //   if (this.selectedImage) {
  //     const formData = new FormData();
  //     this.custobj.custimg = this.selectedImage;
  //     const custmerid = this.custobj.custmerid ? String(this.custobj.custmerid) : '2' ;
  //     const pincode = this.custobj.pincode ? String(this.custobj.pincode) : '462311';
  //     const contact = this.custobj.contactNo ? String(this.custobj.contactNo) : '745328293';

  //     // Add other customer details to the FormData if they are filled
  //     this.appendIfNotEmpty(formData, 'custmerid', custmerid);
  //     this.appendIfNotEmpty(formData, 'customerName', this.custobj.customerName);
  //     this.appendIfNotEmpty(formData, 'gender', this.custobj.gender);
  //     this.appendIfNotEmpty(formData, 'contactNo', contact);
  //     this.appendIfNotEmpty(formData, 'email', this.custobj.email);
  //     this.appendIfNotEmpty(formData, 'address', this.custobj.address);
  //     this.appendIfNotEmpty(formData, 'pincode', pincode);
  //     this.appendIfNotEmpty(formData, 'username', this.custobj.username);
  //     this.appendIfNotEmpty(formData, 'password', this.custobj.password);
  //     formData.append('file', this.custobj.custimg);

  //     // Call your service to upload the image along with other details
  //     this.customerService.updateCustomer(formData).subscribe(
  //       (response) => {
  //         console.log('Image uploaded successfully:', response);
  //         // Update other customer details if needed
  //         this.updateUser();
  //       },
  //       (error) => {
  //         console.error('Error uploading image:', error);
  //         // Handle error as needed
  //       }
  //     );
  //   } else {
  //     console.warn('No image selected for upload');
  //   }
  // }

  // private appendIfNotEmpty(formData: FormData, key: string, value: any) {
  //   if (value !== undefined && value !== null && value !== '') {
  //     formData.append(key, String(value));
  //   }
  // }

}
