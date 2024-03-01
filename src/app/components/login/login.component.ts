import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  
  constructor(private _AuthService:AuthService ,private _Router:Router , private _FormBuilder:FormBuilder){}

  errMsg:string ='';

  isLoading:boolean= false

  loginForm:FormGroup = this._FormBuilder.group ({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  }  )


  confirmPassword(group:FormGroup):void{
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if(rePassword?.value ==''){
      rePassword?.setErrors({required:true});
    } 
    else if(password?.value!=rePassword?.value){
      rePassword?.setErrors({misMatch:true});
    }
  }


  handleForm():void{
   const userData = this.loginForm.value;
   this.isLoading=true
   if(this.loginForm.valid){
    this._AuthService.login(userData).subscribe({
      next:(responce)=> {
        if(responce.massage == 'success'){}
        localStorage.setItem('etoken',responce.token)
        this._AuthService.decodeUser()

        this._Router.navigate (['/home']);
        this.isLoading=false
      },
      error:(err)=>{
        this.isLoading=false
        this.errMsg =err.error.message ;
        
      }
    })
   }
  }

  
}
