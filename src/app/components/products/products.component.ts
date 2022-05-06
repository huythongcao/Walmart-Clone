import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product, ProductService } from 'src/app/services/product.service';

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
  current_page = 1
  @ViewChild('search') searchInput: ElementRef;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      this.filtered = this.products = res.data;
      this.pages = new Array(Math.ceil(res.total / this.per_page))
        .fill(undefined)
        .map((item, index) => index + 1);
      console.log(this.pages);
    });
  }

  onKeyUp(value: string) {
    this.filtered = this.products.filter((item) => item.name.toLowerCase().includes(value.trim().toLowerCase()))
  }

  goToPage(page) {
    this.current_page = page;
    this.productService.getProducts().subscribe((res) => {
      this.filtered = this.products = res.data;
      this.searchInput.nativeElement.value = ''
    });
  }
}
