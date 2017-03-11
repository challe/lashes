import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../services/customer.service';
import { Customer } from './../../models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [CustomerService]
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  customer: Customer;

  constructor(private customerService: CustomerService) {}
  ngOnInit() {
    this.getCustomers();
    this.getCustomer(3);
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }

  getCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(customer => this.customer = customer);
  }

  addCustomer(newCustomer: string) {
    if (newCustomer) {
      this.customerService.addCustomer(newCustomer).subscribe(customer => {
        this.customer = customer;
        this.customers.push(customer);
      });
    }
  }
}
