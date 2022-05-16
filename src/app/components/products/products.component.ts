import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

import { Product, ProductService } from './../../services/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  filtered: Product[];
  per_page = 6;
  total = 0;
  pages = [];
  currentPage = 1;
  @ViewChild('search') searchInput: ElementRef;
  constructor(private productService: ProductService, public cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      this.filtered = this.products = res.data;
      this.total = res.total;
      this.pages = new Array(Math.ceil(res.total / this.per_page))
        .fill(undefined)
        .map((item, index) => index + 1);
    });
  }

  onKeyUp(value: string) {
    this.filtered = this.products.filter((item) =>
      item.name.toLowerCase().includes(value.trim().toLowerCase())
    );
  }

  goToPage(page) {
    this.productService.getProducts(page).subscribe((res) => {
      this.filtered = this.products = res.data;
      this.searchInput.nativeElement.value = '';
    });
    this.currentPage = page;
  }

  onClickPrevious() {
    this.currentPage = this.currentPage - 1;
  }
  onClickNext() {
    this.currentPage = this.currentPage + 1;
  }
}
