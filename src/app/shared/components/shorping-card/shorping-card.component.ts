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
  @Output() openAlert = new EventEmitter<boolean>();
  allPanier : Product[] = [];
  totalPrice : number ;
  about : any;
  constructor(private panier : PanierService ) { 
    this.totalPrice = 0;
  }

  ngOnInit(): void {
   this.about = localStorage.getItem("access-token") as any;
      this.about = JSON.parse(this.about);
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
  submit(){
    let data = {
      user :this.about._id,
      total_price:this.totalPrice,
      msisdn : 333005838
    }
    this.panier.submitCommand(data).subscribe((res)=>{
      console.log(res);
      setTimeout(()=>{
        this.openAlert.emit(true);
      },2000)
    })
  }
}
