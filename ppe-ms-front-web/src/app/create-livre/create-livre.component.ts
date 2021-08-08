import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Livre } from 'src/livre';
import { Router } from '@angular/router';
import { LivreServiceService } from 'src/app/shared/livre-service.service';
import { MustMatch } from '../_helpers/must-match.validator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from '../shared/categorie.service';


@Component({
  selector: 'app-create-livre',
  templateUrl: './create-livre.component.html',
  styleUrls: ['./create-livre.component.css']
})
export class CreateLivreComponent implements OnInit {
  registerForm: FormGroup ;
  submitted = false;
  livre: Livre = new Livre();
  constructor(private categorieService: CategorieService, private livreService: LivreServiceService, private router: Router, private httpClient: HttpClient,private formBuilder: FormBuilder) {
  }
  

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  allCategories: any;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      CodeLivre: ['', Validators.required],
      DesignationLivre: ['', Validators.required],
      NomLivre: ['', Validators.required],
      PrixLivre: ['', [Validators.required]],
      QuantiteLivre: ['', [Validators.required]],
      Categorie: [null, Validators.required],
  });
  this.categorieService.getAllCategories().subscribe(
    data => {
      this.allCategories = data
      console.log(data);
    },
    error => console.log(error)
  );

  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  goToLivreList() {
    this.router.navigate(['/']);
  }
  saveLivre(livreToSave:any) {
    this.livre.codeLivre = livreToSave.CodeLivre;
    this.livre.designationLivre = livreToSave.DesignationLivre;
    this.livre.nomLivre = livreToSave.NomLivre;
    this.livre.prixLivre = livreToSave.PrixLivre;
    this.livre.quantiteLivre = livreToSave.QuantiteLivre;
    this.livre.categorie = `http://localhost:8080/categories/${livreToSave.Categorie}`;
    console.log('livre: ',this.livre);
    this.livreService.createLivre(this.livre).subscribe(
    data => {
      console.log('rererer',data);
      this.goToLivreList();
    },
    error => console.log(error));
  }

  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded';
        }
      }
      );
  }
  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }


  onSubmit() {
    console.log( this.registerForm.value);
    this.saveLivre(this.registerForm.value);
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}
}
