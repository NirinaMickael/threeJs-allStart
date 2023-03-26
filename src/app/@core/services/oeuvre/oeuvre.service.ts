import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OeuvreService {

  private baseUrl = environment.SERVER_URL + '/api/product';
  oeuvres: any = []; 
  constructor(private http: HttpClient) { }

  getAllOeuvre() {
    console.log(this.baseUrl);
    return this.http.get(this.baseUrl).pipe(catchError(() => of({data: []})));
  }

  loadOeuvres() {
    this.getAllOeuvre().subscribe((o: any) => {
      this.oeuvres = o.data;
    })
  }

  getOeuvresByName(name: string) {
    console.log(name, this.oeuvres);
    const result = this.oeuvres.find((o: any) => o.objectName === name);
    return result;
  }

}
