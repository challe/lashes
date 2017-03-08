import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/customers/customers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customers', component: CustomersComponent}
];

export const routing = RouterModule.forRoot(routes);
