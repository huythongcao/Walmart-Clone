import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    name: '',
    year: null,
    color: '',
    pantone_value: '',
    price: null
  };

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id']
    // console.log(id)
    if (id) {
      this.productService.getProduct(id).subscribe(res => {
        this.product = res;
        console.log(res);
        
      })
    }
  }

}
