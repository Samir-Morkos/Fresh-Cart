import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-navbar-blank',
  standalone:true,
  imports:[CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit {

  constructor(private _Router:Router ,
     private _CartService:CartService ,
     private _WishlistService:WishlistService ,
    private _Renderer2:Renderer2
    ){}

  @ViewChild('navBar') navElement!:ElementRef

  @HostListener('window : scroll')

  onScroll():void{
    if( scrollY > 500 ){
      this._Renderer2.addClass(this.navElement.nativeElement,'px-5')
      this._Renderer2.addClass(this.navElement.nativeElement,'shadow')
    }else{
      this._Renderer2.removeClass(this.navElement.nativeElement,'px-5')
      this._Renderer2.removeClass(this.navElement.nativeElement,'shadow')
    }

  }

  cartNumber:number=0;
  
  wishNumber:number=0;

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:( data )=>{
        this.cartNumber=data
      }
    })

    this._CartService.getCartUser().subscribe({
      next:(response)=>{
        console.log(response.numOfCartItems)
        this.cartNumber=response.numOfCartItems;
      },error:(err)=>{

      }
    })



    

  }

  signOut():void{
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }

}
