/// <reference path="service.ts" />

import { Injectable } from '@angular/core';
import { Service } from './service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppointmentType } from '../models/appointment-type';

@Injectable()
export class AppointmentTypesService extends Service {

  getAppointmentTypes(): AppointmentType[] {
    const appointmentTypes: Array<AppointmentType> = new Array<AppointmentType>();
    appointmentTypes.push(new AppointmentType(1, "Nytt set"));
    appointmentTypes.push(new AppointmentType(2, "Påfyllning"));

    return appointmentTypes;
  }
}
