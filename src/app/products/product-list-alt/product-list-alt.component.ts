import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { catchError, EMPTY, Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent  {
  pageTitle = 'Products';
  errorMessage = '';

  products$: Observable<Product[]> = this.productService.productsWithCategories$.
  pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );


  constructor(private productService: ProductService) { }


  selectedProduct$ = this.productService.selectedProduct$;


  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
