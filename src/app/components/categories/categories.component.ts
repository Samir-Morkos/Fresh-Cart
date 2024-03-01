import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/interface/category';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-categories',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  constructor(private _ProductService:ProductService){}
  
  categoryData:Category[]=[];

  ngOnInit(): void {
    this._ProductService.getCategories().subscribe({
      next:(responce)=>{
        this.categoryData=responce.data;
      }
    })
  }

}
