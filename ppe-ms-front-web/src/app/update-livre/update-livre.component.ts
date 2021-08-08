import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Livre } from 'src/livre';
import { LivreServiceService } from 'src/app/shared/livre-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-livre',
  templateUrl: './update-livre.component.html',
  styleUrls: ['./update-livre.component.css']
})
export class UpdateLivreComponent implements OnInit {

  id!: number;
  livre: Livre = new Livre();
  constructor(private livreService: LivreServiceService, private route: ActivatedRoute,
    private router: Router, private httpClient: HttpClient) { }

  selectedFile: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: any;
  imageName: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.livreService.getLivreById(this.id).subscribe(data => {
      this.livre = data;
    }, error => console.log(error));
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
    // this.livre.categorie = `http://localhost:8080/categories/${this.livre.categorie}`;
    this.livreService.updateLivre(this.id, this.livre).subscribe(data => {
      console.log('ezrzer');
      this.goToLivreList();
    }, error => this.goToLivreList());
  }

  goToLivreList() {
    this.router.navigate(['/']);
  }

}
