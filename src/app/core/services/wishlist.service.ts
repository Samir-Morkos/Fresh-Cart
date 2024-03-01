import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseUrl:string=`https://ecommerce.routemisr.com/api/v1/`

  constructor(private _HttpClient:HttpClient) { }

  addToWishlist(prodId:string|undefined):Observable<any> {
    return this._HttpClient.post(this.baseUrl+`wishlist`,
    {
      productId:prodId
    }
    )
  }

  getWishlList():Observable<any>{
    return this._HttpClient.get(this.baseUrl+`wishlist`)
  }

  removeWishlList(prodId:string|undefined):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`wishlist/${prodId}`)
  }


}
