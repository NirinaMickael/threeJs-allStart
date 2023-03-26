import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../schema/product';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private baseUrl = environment.SERVER_URL + '/api/order';
  panier$  = new BehaviorSubject<Product[]>([]);
  constructor(private http : HttpClient) { }
  submitCommand(data:any){
    return this.http.post(this.baseUrl,data);
  } 
}
