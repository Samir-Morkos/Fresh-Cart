import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{

  constructor(private _BrandsService:BrandsService){}
  
  brandsData:any[]=[];

  ngOnInit(): void {
    this._BrandsService.getBrands().subscribe({
      next:(responce)=>{
        this.brandsData=responce.data;
      }
    })
  }
}
