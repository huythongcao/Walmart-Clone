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
    // Get dữ liệu có định dạng Observable của ProductResponse từ URL về 
    // Tham số thứ 2 của get() là 1 object params chứ các param của URL 
    // Bình thường có thể viết là get<...>(template string của URL)
    // Nhưng dùng cách này có thể kiểm soát được nhiều param của URL
      .get<ProductResponse>(this.baseUrl, {
        params: {
          // Dùng toString là để convert số 1 sang string 
          page: page.toString(),
        },
      })
      // pipe(): chọc vào luồng dữ liệu được truyền đi từ observable tới observer 
      .pipe(
        // map của rxjs khác map của array thường ở chỗ có thể đọc Observable
        // map của rxjs nhận vào 1 observable và trả về 1 observable
        // item ở đây là Observable có dạng ProductResponse 
        map((item) => {
          // map này là map thường 
          item.data.map((product) => {
            // Fix cứng price cho từng product 
            product.price = Math.floor(Math.random() * 100) + 1;
            return product;
          });
          return item;
        })
      );
  }

  getProduct(id) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      // res có định dạng any là để nhận bất cứ kiểu dữ liệu nào
      map((res: any) => {
        let product: Product = res.data;
        product.price = Math.floor(Math.random() * 100) + 1;
        // return về 1 observable 
        return product;
      })
    );
  }
}
