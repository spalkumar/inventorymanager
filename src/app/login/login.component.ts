import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userdata!: User;
  /**
     * 
     * @param builder 
     * @param toastr Used for popup
     * @param service Used to make http calls to service
     * @param router Used for routing to next or previous pages
     */
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router) {

  }
  loginform = this.builder.group({
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetUserByCode(this.loginform.value.name).subscribe((res: User[]) => {
        if (res.length > 0) {
          this.userdata = res[0];
          console.log('user data ===== ' + this.userdata.name);
          if (this.userdata.name === this.loginform.value.name && this.userdata.password === this.loginform.value.password) {
            if (this.userdata.isactive) {
              sessionStorage.setItem('username', this.userdata.name);
              sessionStorage.setItem('role', this.userdata.role);
              this.router.navigate(['']);
            } else {
              this.toastr.error('Please contact administrator', 'User not active.');
            }
          } else {
            this.toastr.error('User not found. Please register');
          }
        } else {
          this.toastr.error('Please register', 'User not found.');
        }
      });
    }
  }
}
