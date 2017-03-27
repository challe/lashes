import { Customer } from './customer';
import { AppointmentLash } from './appointment-lash';

export class Appointment {
    constructor() {
        this.appointmentLashes = new Array<AppointmentLash>();
    }
    id: number;
    customerID: number;
    fromTime: string;
    toTime: string;
    appointmentTypeId: number;

    customer: Customer;

    appointmentLashes: AppointmentLash[];
}