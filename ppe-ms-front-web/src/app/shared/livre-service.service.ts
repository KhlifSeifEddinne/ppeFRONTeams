import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from 'src/livre';

@Injectable({
  providedIn: 'root'
})
export class LivreServiceService {
  private baseURL = "http://localhost:8080/livres";

  constructor(private httpClient: HttpClient) { }

  getLivreList(): Observable<Livre[]> {
    return this.httpClient.get<Livre[]>(`${this.baseURL}`);
  }

  getLivreById(id: number): Observable<Livre> {
    return this.httpClient.get<Livre>(`${this.baseURL}/${id}`);
  }

  getLivreByName(name: string): Observable<Livre> {
    return this.httpClient.get<Livre>(`http://localhost:8080/livres/search/byNom?mc=${name}`);
  }

  createLivre(livre: Livre): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, livre);
  }

  updateLivre(id: number, livre: Livre): Observable<Object> {
    return this.httpClient.put(`http://localhost:8080/listLivre/${id}`, livre);
  }
  deleteLivre(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
