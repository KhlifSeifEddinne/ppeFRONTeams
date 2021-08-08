import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorie } from 'src/categorie';
import { CategorieService } from '../shared/categorie.service';
import { Livre } from 'src/livre';



@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent implements OnInit {
  ngOnInit(): void {
  }
  baseUrl = "http://localhost:8080/categories";
  listCategories: Categorie[] = [];
  Livre:any;

  constructor(private httpClient: HttpClient, private categorieService: CategorieService) { }


  getAllCategories() {
    this.categorieService.getAllCategories().subscribe(data => {
      this.listCategories = data;
      console.log(data);

    })
  }

}
