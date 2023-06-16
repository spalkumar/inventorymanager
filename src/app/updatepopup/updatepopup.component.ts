import { Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { map } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { User } from '../user';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit{

  user!: User;
  /**
   * 
   * @param builder 
   * @param toastr Used for popup
   * @param service Used to make http calls to service
   * @param router Used for routing to next or previous pages
   */
   constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service:AuthService, private router: Router,@Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<UpdatepopupComponent>){

  }
  ngOnInit(): void {
    console.log("This data in dialog===  "+this.data)
    if(this.data.userCode !=null && this.data.userCode != ''){
      this.service.GetUserById(this.data.userCode).subscribe((res: User[]) =>{
        if (res.length > 0) {
          this.user = res[0];
          this.updateuserform.setValue({name:this.user.name, role:this.user.role, isactive:this.user.isactive});
        }

      })
    }
  }
  updateuserform=this.builder.group({
    name:this.builder.control(''),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  updateuser(){
    if(this.updateuserform.valid){
      this.service.UpdateUser(this.data.userCode, this.updateuserform.value).subscribe((res: User)=>{
        this.toastr.success("Update successful", "User Updated");
        this.dialogRef.close();
        this.router.navigateByUrl('/user');
      });
    }
  }

}
