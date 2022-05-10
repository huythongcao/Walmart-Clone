import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
  price: number;
}

interface ProductResponse {
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
  private baseUrl = 'https://reqres.in/api/products';
  constructor(private http: HttpClient) {}

  getProducts(page = 1): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(this.baseUrl, {
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
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      map((res: any) => {
        let product: Product = res.data;
        product.price = Math.floor(Math.random() * 100) + 1;

        return product;
      })
    );
  }
}
