import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Category } from 'src/app/core/interface/category';
import { Product } from 'src/app/core/interface/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _CartService: CartService
  ) {}

  products: Product[] = [];
  categories: Category[] = [];
  term: string = ``;
  wishList: string[] = [];

  ngOnInit(): void {
    this._WishlistService.getWishlList().subscribe({
      next: (responce) => {
        this.products = responce.data;
      },
    });

    this._WishlistService.getWishlList().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id);
        this.wishList = newData;
      },
    });
  }

  addProduct(id: any, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (responce) => {
        this._ToastrService.success(responce.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(responce.numOfCartItems);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  addFav(prodId: any): void {
    this._WishlistService.addToWishlist(prodId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this.wishList = response.data;
      },
    });
  }

  removeFav(prodId: any): void {
    this._WishlistService.removeWishlList(prodId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this.wishList = response.data;

        const newProductsData =this.products.filter((item:any)=>this.wishList.includes(item._id));
        this.products=newProductsData;
      },
    });
  }
}
