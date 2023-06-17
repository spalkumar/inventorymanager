import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../service/products.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Products } from '../products';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-createproductpopup',
  templateUrl: './createproductpopup.component.html',
  styleUrls: ['./createproductpopup.component.css']
})
export class CreateproductpopupComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: ProductsService,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateproductpopupComponent>, private authservice:AuthService) { }

  createproductform = this.builder.group({
    name: this.builder.control(''),
    quantity: this.builder.control(''),
    price: this.builder.control(''),
    description: this.builder.control(''),
    lastupdated: this.builder.control(''),
    updatedby:this.builder.control(this.authservice.GetUserName())
  });

  createproduct() {
    
    if (this.createproductform.valid) {
      let isproductexist=false;
      this.service.GetAllProducts().subscribe((res:Products[]) =>{
        console.log("Calling the create product"+res);
        if(res.length>0){
          res.forEach(Products=>{
            console.log("Each product"+Products);
            if(this.createproductform.value.name == Products.name){
              isproductexist=true;
            }
          });
        }
      });
      if(!isproductexist){
        this.service.CreateProduct(this.createproductform.value).subscribe((res: Products)=>{
          this.toastr.success("Product Crreated Successfully", "Product Created");
          this.dialogRef.close();
          this.router.navigateByUrl('/products');
        });
      } else {
        this.toastr.error("Product already exist.", "Duplicate Product");
      }
    }
  }

}
