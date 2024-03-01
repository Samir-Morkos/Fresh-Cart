import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/core/interface/category';
import { Product } from 'src/app/core/interface/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone:true,
  imports:[CommonModule,RouterLink,CuttextPipe,NgxPaginationModule,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  
  constructor(
    private _ProductService:ProductService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService,

    ){}
    
  categories:Category[]=[];
  products:Product[]=[];
  pageSize:number=0
  currentPage:number=1
  total:number=0
  wishList:string[]=[];
  term:string=``

  ngOnInit(): void {

    this._ProductService.getProducts().subscribe({
      next:(responce) =>{
        console.log('products', responce.data);
       this.products=responce.data;
       this.pageSize=responce.metadata.limit;
       this.currentPage=responce.metadata.currentPage;
       this.total=responce.results;
      }
    })

    
  }

  addProduct(id:any,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true');
    this._CartService.addToCart(id).subscribe({
      next:(responce)=>{
        console.log(responce);
        this._ToastrService.success(responce.message);
        this._Renderer2.removeAttribute(element,'disabled');
        this._CartService.cartNumber.next(responce.numOfCartItems);
      },error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled');
      }
    })
  }

  pageChanged(event:any):void{
    this._ProductService.getProducts(event).subscribe({
      next:(responce) =>{
        console.log('products', responce.data);
       this.products=responce.data;
       this.pageSize=responce.metadata.limit;
       this.currentPage=responce.metadata.currentPage;
       this.total=responce.results;
      }
    })
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
