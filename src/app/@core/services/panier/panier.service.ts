import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../schema/product';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  panier$  = new BehaviorSubject<Product[]>([]);
  constructor() { }
}
