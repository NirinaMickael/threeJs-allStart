import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/@core/schema/product';
import { PanierService } from 'src/app/@core/services/panier/panier.service';

@Component({
  selector: 'app-shorping-card',
  templateUrl: './shorping-card.component.html',
  styleUrls: ['./shorping-card.component.scss']
})
export class ShorpingCardComponent implements OnInit {
  @Output( ) closePanel = new EventEmitter<boolean>();
  allPanier : Product[] = [];
  totalPrice : number ;
  constructor(private panier : PanierService) { 
    this.totalPrice = 0;
  }

  ngOnInit(): void {
    this.panier.panier$.subscribe(res=>{
      this.totalPrice =  res.map(item => item.price)
      .reduce((prev, curr) => prev + curr, 0);
      this.allPanier =res;
    });
  }
  close(){
    this.closePanel.emit(false);
  }
  removeItem(data:Product){
    this.panier.panier$.next([...this.allPanier.filter(e=>e.objectName!=data.objectName)])
  }
}
