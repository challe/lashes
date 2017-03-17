/// <reference path="service.ts" />

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Service } from './service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Appointment } from '../models/appointment';
import { AppSettings } from '../appSettings';

@Injectable()
export class AppointmentService extends Service {
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private http: Http) {
    super();
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get(AppSettings.API_ENDPOINT + '/appointments')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get(AppSettings.API_ENDPOINT + '/appointments/' + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post(AppSettings.API_ENDPOINT + '/appointments/', JSON.stringify(appointment), {headers: this.headers})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  deleteAppointment(id: number): Observable<Appointment> {
    return this.http.delete(AppSettings.API_ENDPOINT + '/appointments/' + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}
