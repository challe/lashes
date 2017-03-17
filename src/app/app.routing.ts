import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customers', component: CustomersComponent},
  { path: 'appointments', component: AppointmentsComponent}
];

export const routing = RouterModule.forRoot(routes);
