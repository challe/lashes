import { Component, OnInit } from '@angular/core';
import { AppointmentService } from './../../services/appointment.service';
import { CustomerService } from './../../services/customer.service';
import { AppointmentTypesService } from './../../services/appointment-type.service';
import { Appointment } from './../../models/appointment';
import { AppointmentType } from './../../models/appointment-type';
import { Customer } from './../../models/customer';
import { AppointmentLash } from './../../models/appointment-lash';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  providers: [AppointmentService, CustomerService, AppointmentTypesService]
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[];
  appointment: Appointment;
  newAppointment: Appointment = new Appointment();
  customers: Customer[];
  appointmentTypes: AppointmentType[];
  curves: string[];
  lengths: number[];

  constructor(private appointmentService: AppointmentService,
    private customerService: CustomerService,
    private appointmentTypesService: AppointmentTypesService) {}

  ngOnInit() {
    this.initNewAppointment();
    this.getAppointments();
    this.getCustomers();
    this.getAppointmentTypes();
    this.getCurves();
    this.getLengths();
  }

  initNewAppointment() {
    this.newAppointment.fromTime = new Date().toISOString().slice(0, 16);
    this.newAppointment.appointmentTypeId = 2;
    this.addAppointmentLash();
    this.updateToTime();
  }

  addAppointmentLash() {
    this.newAppointment.appointmentLashes.push(new AppointmentLash());
  }

  updateToTime() {
    var ToTime: Date = new Date(this.newAppointment.fromTime);

    if(this.newAppointment.appointmentTypeId == 1) {
      ToTime.setHours(ToTime.getHours()+2);
      ToTime.setMinutes(ToTime.getMinutes()+30);
    }
    else if(this.newAppointment.appointmentTypeId == 2) {
      ToTime.setHours(ToTime.getHours()+1);
      ToTime.setMinutes(ToTime.getMinutes()+30);
    }
    
    this.newAppointment.toTime = ToTime.toISOString().slice(0, 16);
  }

  getCurves() {
    this.curves = ["C", "D"];
  }

  getLengths() {
    this.lengths = [8,9,10,11,12,13,14,15];
  }

  getAppointmentTypes() {
      this.appointmentTypes = this.appointmentTypesService.getAppointmentTypes();
  }

  getAppointments() {
    this.appointmentService.getAppointments().subscribe(appointments => this.appointments = appointments);
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }

  getAppointment(id: number) {
    this.appointmentService.getAppointment(id).subscribe(appointment => this.appointment = appointment);
  }

  addAppointment() {
    if (this.newAppointment) {
      this.appointmentService.addAppointment(this.newAppointment).subscribe(appointment => {
        this.appointment = appointment;
        this.appointments.push(appointment);
      });
    }
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(appointment => {
      let idToRemove: number;
      for(let i = 0; i < this.appointments.length; i++) {
        if(this.appointments[i].id == appointment.id) {
          idToRemove = i;
        }
      }
      this.appointments.splice(idToRemove, 1);
    });
  }
}
