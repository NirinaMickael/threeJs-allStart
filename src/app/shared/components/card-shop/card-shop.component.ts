import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/@core/schema/product';
import { VirtualService } from 'src/app/@core/services/virtual/virtual.service';
import { PanierService } from 'src/app/@core/services/panier/panier.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-card-shop',
  templateUrl: './card-shop.component.html',
  styleUrls: ['./card-shop.component.scss']
})
export class CardShopComponent implements OnInit {
  @Input() product !: Product ;
  currentData !:Product[];
  @Output() addCard = new EventEmitter<boolean>();
  @Output() cancelCard = new EventEmitter<boolean>();
  constructor(  private virtual : VirtualService , private pannier  : PanierService) { 
  }

  ngOnInit(): void {
    this.pannier.panier$.subscribe(res=>{
      this.currentData = res;
    })
  }
  addToCard(){
    // let data : any;
    // console.log("kjdjk");
    
    this.pannier.panier$.next([...this.currentData,this.product]);
    this.addCard.emit(true)
  }
  Cancel(){
   this.cancelCard.emit(false)
  }
}
