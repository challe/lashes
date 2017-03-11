/// <reference path="service.ts" />

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Service } from './service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Customer } from '../models/customer';
import { AppSettings } from '../appSettings';

@Injectable()
export class CustomerService extends Service {
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private http: Http) {
    super();
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get(AppSettings.API_ENDPOINT + '/customers')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get(AppSettings.API_ENDPOINT + '/customers/' + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addCustomer(name: string): Observable<Customer> {
    const customer: Customer = new Customer();
    customer.name = name;

    return this.http.post(AppSettings.API_ENDPOINT + '/customers/', JSON.stringify(customer), {headers: this.headers})
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}
