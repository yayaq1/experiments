import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'list', component: ListComponent },
    { path: 'add-item', component: AddItemComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' } // default route
  ];
  

export default routes;