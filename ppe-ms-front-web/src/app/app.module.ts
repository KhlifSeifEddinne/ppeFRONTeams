import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LivreComponent } from './livre/livre.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateLivreComponent } from './create-livre/create-livre.component';
import { UpdateLivreComponent } from './update-livre/update-livre.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MaterialModule } from './material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { ReactiveFormsModule } from '@angular/forms';



//import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/*import { LoginComponent } from './login/login.component';
import { RestapiService } from './restapi.service';
import { HomeComponent } from './home/home.component';*/

@NgModule({
  declarations: [
    AppComponent,
    LivreComponent,
    CreateLivreComponent,
    UpdateLivreComponent,
    MatConfirmDialogComponent,
    DropdownMenuComponent,

    /*LoginComponent,
    HomeComponent*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule

    /*MatSnackBar,
    MatSnackBarConfig*/
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent]
})
export class AppModule { }
