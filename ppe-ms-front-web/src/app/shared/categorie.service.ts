import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from 'src/categorie';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  baseUrl = "http://localhost:8080/categories";
  listCategories: any;

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(this.baseUrl).pipe(
      map(
        response => response
      )
    )
  }
}
