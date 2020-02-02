import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { Page1Component } from './page1/page1.component';


const routes: Routes = [
  // TODO: I want to change the urls depending on the language such as /en/index and /ja/page1
  { path: 'index', component: IndexComponent },
  { path: 'page1', component: Page1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
