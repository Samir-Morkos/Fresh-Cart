export interface Product {
    title: string
    price: number
    imageCover: string
    category: Categoryprod
    ratingsAverage: number
    _id?:string
  }
  
  export interface Categoryprod {
    name: string
  }
  
