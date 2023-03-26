import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OeuvreService {

  private baseUrl = environment.SERVER_URL + '/api/oeuvres';
  oeuvres: any = []; 
  constructor(private http: HttpClient) { }

  getAllOeuvre() {
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
