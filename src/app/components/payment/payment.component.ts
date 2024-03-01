import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute,private _FormBuilder:FormBuilder,private _CartService:CartService){}

  cartId: any='';
  

  registerForm:FormGroup = this._FormBuilder.group({
    details :['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    phone: ['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city :['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  } )

  handleForm():void{
    console.log(this.registerForm.value,)
    this._CartService.checkOut(this.cartId,this.registerForm.value).subscribe({
      next:(Response)=>{
        console.log(Response)
        if(Response.status ==="success"){
          window.open(Response.session.url ,'_self')

        }
      }
    })
  }


  ngOnInit(): void { 
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId=param.get('id')
      }
    })
  }

}
