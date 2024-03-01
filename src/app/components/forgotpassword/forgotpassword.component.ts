import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotpassService } from 'src/app/core/services/forgotpass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {

  step1:boolean=true
  step2:boolean=false
  step3:boolean=false

  email:string=''
  userMsg:string=''

  isLoading:boolean= false

  constructor(
    private _FormBuilder:FormBuilder,
    private _ForgotpassService:ForgotpassService,
    private _Router:Router    
    ){}

  emailForm:FormGroup = this._FormBuilder.group({

    email: ['',[Validators.required,Validators.email]],

  } )

  resetCodeForm:FormGroup = this._FormBuilder.group({

    resetCode: ['',[Validators.required]],

  } )

  passwordForm:FormGroup = this._FormBuilder.group({

    newPassword: ['',[Validators.required,Validators.pattern(/^\w{6,}$/)]],

  } )

  forgotPassword():void{
    let userEmail=this.emailForm.value;
    this.email=userEmail.email;
    this._ForgotpassService.forgotpassword(userEmail).subscribe({
      next:(responce)=>{
        this.userMsg=responce.message;
        this.step1=false
        this.step2=true
      },error:(err)=>{
        this.userMsg=err.error.message;
      }
    })
  }

  resetCode():void{
    let resetCode =this.resetCodeForm.value;
    this._ForgotpassService.resetCode(resetCode).subscribe({
      next:(responce)=>{
        console.log(responce)
        this.userMsg=responce.status
        this.step2=false;
        this.step3=true;
      },error:(err)=>{
        this.userMsg=err.error.message;
        
      }
    })

    }

  

  resetPassword():void{
    let resetForm = this.passwordForm.value;
    resetForm.email= this.email;
    this._ForgotpassService.updatepassword(resetForm).subscribe({
      next:(responce)=>{
        if(responce.token){
          localStorage.setItem('etoken',responce.token);
          this._Router.navigate(['/home'])
        }
      },error:(err)=>{
        this.userMsg=err.error.message;
      }
    })

  }


  
}


