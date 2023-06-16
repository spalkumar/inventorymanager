import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { map } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User[] = [];
  /**
   * 
   * @param builder 
   * @param toastr Used for popup
   * @param service Used to make http calls to service
   * @param router Used for routing to next or previous pages
   */
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service:AuthService, private router: Router){

  }
  /**
   * This is used to for validation control on form in group
   */
  registerform=this.builder.group({
    name:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  proceedregistration(){
    // Check if the form data is valid based on registerform controls
    // If not valid, then send a warning message as stated in else
    if(this.registerform.valid){
      this.service.GetAllUser().subscribe((users: User[])=>{
        let isUserExist = false;
        users.forEach(user =>{
          if(user.name === this.registerform.value.name){
            isUserExist = true;
          }
        });
        if(isUserExist){
          this.toastr.warning('User already exist');
        } else {
          this.service.CreateUser(this.registerform.value).subscribe(res=>{
            this.toastr.success('User Created');
            this.router.navigate(['login']);
          });
        }
      });
    } else {
      this.toastr.warning('Please use valid data');
    }
  }


}
