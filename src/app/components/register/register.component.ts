import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService ,private _Router:Router , private _FormBuilder:FormBuilder){}

  errMsg:string ='';

  isLoading:boolean= false

  registerForm:FormGroup = this._FormBuilder.group({
    name :['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.pattern(/^\w{6,}$/)]],
    rePassword: [''],
    phone: ['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  } , { validators:[this.confirmPassword ] }  )

  // registerForm:FormGroup = new FormGroup({
  //   name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  //   email: new FormControl('',[Validators.required,Validators.email]),
  //   password: new FormControl('',[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  //   rePassword: new FormControl(''),
  //   phone: new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // },{ validators:[this.confirmPassword ] } as FormControlOptions);


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
   const userData = this.registerForm.value;
   this.isLoading=true
   if(this.registerForm.valid){
    this._AuthService.register(userData).subscribe({
      next:(responce)=> {
        if(responce.massage == 'success'){}
        this._Router.navigate (['/login']);
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
