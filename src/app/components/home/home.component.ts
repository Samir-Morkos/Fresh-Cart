import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Category } from 'src/app/core/interface/category';
import { Product } from 'src/app/core/interface/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';


@Component({
  selector: 'app-home',
  standalone:true,
  imports:[CommonModule,CuttextPipe,CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _ProductService:ProductService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService,
    ){}

  products:Product[]=[];
  categories:Category[]=[];
  term:string=``
  wishList:string[]=[];

  ngOnInit(): void {

    this._ProductService.getProducts().subscribe({
      next:(response) =>{
        console.log('products', response.data);
       this.products=response.data;
      }
    })

    this._ProductService.getCategories().subscribe({
      next:(response)=>{
        console.log('categories', response.data);
        this.categories=response.data;
      }
    })

    this._WishlistService.getWishlList().subscribe({
      next:(response)=>{
        const newData= response.data.map((item:any)=>item._id)
        this.wishList=newData;
      }
    })
  }

  addProduct(id:any,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true');
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element,'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled');
      }
    })

  }

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:5000,
    autoplaySpeed:1000,
    navText: ['prev', 'next'],
    items: 1,
    nav: false
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:7000,
    autoplaySpeed:1000,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 8
      }
    },
    nav: false
  }

  addFav(prodId:any):void{
    this._WishlistService.addToWishlist(prodId).subscribe({
      next:(response)=>{
        console.log(response)
        this._ToastrService.success(response.message)
        this.wishList=response.data
      }
    })
  }

  removeFav(prodId:any):void{
    this._WishlistService.removeWishlList(prodId).subscribe({
      next:(response)=>{
        console.log(response)
        this._ToastrService.success(response.message)
        this.wishList=response.data
      }
    })
  }


}
