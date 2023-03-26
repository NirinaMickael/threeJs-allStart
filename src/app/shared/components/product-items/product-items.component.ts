import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/@core/schema/product';


@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.scss']
})
export class ProductItemsComponent implements OnInit {
  @Input() panier !: Product;
  @Output() remove = new EventEmitter<Product>();
  constructor() { }

  ngOnInit(): void {
  }
  onRemove(){
    this.remove.emit(this.panier);
  }
}
