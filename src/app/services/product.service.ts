// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// export interface Product {
//   id: number;
//   name: string;
//   year: number;
//   color: string;
//   pantone_value: string;
//   price: number;
// }

// export interface ProductResponse {
//   page: number;
//   per_page: number;
//   total: number;
//   total_pages: number;
//   data: Product[];
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class ProductService {
//   constructor(private http: HttpClient) {}

//   getProducts(page = 1): Observable<ProductResponse> {
//     return this.http
//       .get<ProductResponse>('https://reqres.in/api/products', {
//         params: {
//           page: page.toString()
//         }
//       })
//       .pipe(
//         map((data) => {
//           data.data.map((item: Product) => {
//             item.price = Math.floor(Math.random() * 100) + 1;
//             return item;
//           });
//           return data;
//         })
//       );
//   }
// }

import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

export interface Product {
  id?: number;

  name: string;

  year: number | null;

  color: string;

  pantone_value: string;

  price: number | null;
}
export interface ProductResponse {
  page: number;

  per_page: number;

  total: number;

  total_pages: number;

  data: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL: string = 'https://reqres.in/api/products';

  constructor(private http: HttpClient) {}

  getProducts(page = 1): Observable<ProductResponse> {
    return this.http

      .get<ProductResponse>(this.baseURL, {
        params: {
          page: page.toString(),
        },
      })

      .pipe(
        map((item) => {
          item.data.map((product) => {
            product.price = Math.floor(Math.random() * 100) + 1;

            return product;
          });

          return item;
        })
      );
  }

  getProduct(id) {
    return this.http.get(`${this.baseURL} / ${id}`).pipe(map((res:any) => {
      let product = res.data;
      // Fake price
      product.price = Math.floor(Math.random() * 100) + 1;
      return product;
    }))

  }
}
