import { Customer} from './customer';

export class Appointment {
    id: number;
    customerID: number;
    fromTime: string;
    toTime: string;
    appointmentTypeId: number;

    customer: Customer;
}