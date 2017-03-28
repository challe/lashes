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
  customers: Customer[] = new Array<Customer>();
  newCustomer: Customer = new Customer();
  customer: Customer;
  opened: boolean = false;
  addCustomerOpened: boolean = false;

  constructor(private customerService: CustomerService) {
    this.customers.push(new Customer());
  }
  ngOnInit() {
    this.getCustomers();
  }

  showCustomer(customer: Customer) {
    this.customer = customer;
    this.opened = true;
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }

  getCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(customer => this.customer = customer);
  }

  addCustomer() {
    this.addCustomerOpened = false;
    this.customerService.addCustomer(this.newCustomer).subscribe(customer => {
      this.customer = customer;
      this.customers.push(customer);
      this.newCustomer = new Customer();
    });
  }

  deleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer).subscribe(customer => {
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
