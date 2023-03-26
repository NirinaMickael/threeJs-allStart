import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirtualService {
  cardShop$  = new BehaviorSubject(false);
  ListShop$  = new BehaviorSubject(false);
  alert$ = new BehaviorSubject(false);
  constructor() { }
}
