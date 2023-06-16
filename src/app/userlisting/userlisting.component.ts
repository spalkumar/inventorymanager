import { Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../user';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';


@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent {
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !:MatPaginator;


  displayedColumns: string[] = ['username', 'name', 'role', 'status', 'action'];
  constructor(private service: AuthService, private dialog:MatDialog) { 
    this.LoadUser();
  }
  LoadUser() {
    this.service.GetAllUser().subscribe((users: User[]) => {
      this.userlist = users;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
    });
  }

  UpdateUser(code: any){
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data:{
        userCode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    })

  }

  opendialog(){

  }
}
