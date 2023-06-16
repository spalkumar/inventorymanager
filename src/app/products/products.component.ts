import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../service/products.service';
import { Products } from '../products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  productSource:any;
  @ViewChild(MatPaginator) paginator !:MatPaginator;

  displayedColumns: string[] = ['name', 'quantity', 'price', 'description', 'lastUpdated', 'updatedby', 'action'];
  constructor(private service: ProductsService, private dialog:MatDialog) { 
    this.service.GetAllProducts().subscribe((res:Products[]) =>{
      this.productSource = res;
    });
  }

  UpdateProduct(data:any){

  }

}
