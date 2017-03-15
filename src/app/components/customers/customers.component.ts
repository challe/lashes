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

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(customer => {
      let idToRemove: number;
      for(let i = 0; i < this.customers.length; i++) {
        if(this.customers[i].id == customer.id) {
          idToRemove = i;
        }
      }
      this.customers.splice(idToRemove, 1);
    });
  }
}
