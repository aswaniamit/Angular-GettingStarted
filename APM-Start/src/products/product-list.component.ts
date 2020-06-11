import { Component, OnInit } from '@angular/core';
import { IProduct } from './IProduct';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // class properties
  pageTitle = 'Bound Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;

  _listFilter: string;
  filteredProducts: IProduct[];
  errorMessage: any;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  products: IProduct[] = [];

  constructor(private productService: ProductService) {

  }

  // method
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  performFilter(filterString: string): IProduct[] {
    filterString = filterString.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterString) !== -1);
  }

  onRatingClicked(starRatingEvent: string) {
    this.pageTitle = 'Product List:' + starRatingEvent;
  }

  // Interface Implementation
  ngOnInit(): void {
    console.log('In OnInit');
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });

  }

}
