import { Component, OnInit } from '@angular/core';

import { CustomerService } from './services/customer.service';
import { Customer } from './models/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CustomerService]
})
export class AppComponent implements OnInit {
  errorMessage: string;
  customers: Customer[];

  constructor(private customerService: CustomerService) {}

  ngOnInit() { this.getCustomers(); }

  getCustomers() {
    this.customerService.getCustomers()
                     .subscribe(customers => this.customers = customers,
                     error => this.errorMessage = <any>error);
  }
}
