import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivreComponent } from './livre/livre.component';
import { CreateLivreComponent } from './create-livre/create-livre.component';
import { UpdateLivreComponent } from './update-livre/update-livre.component';

const routes: Routes = [
  { path: '', component: LivreComponent },
  { path: 'create-livre', component: CreateLivreComponent },
  { path: 'update-livre/:id', component: UpdateLivreComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
