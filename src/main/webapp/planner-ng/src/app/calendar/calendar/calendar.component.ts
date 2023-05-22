import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPluggin from '@fullcalendar/timegrid';
import {
  CalendarOptions,
  DateInput,
  DateSelectArg,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEventComponent } from '../modal-event/modal-event.component';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { Agenda } from 'src/app/models/agenda.model';
import * as bootstrap from 'bootstrap';
import { style } from '@angular/animations';
import * as moment from 'moment';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModaleconfermaComponent } from 'src/app/modal/modaleconferma/modaleconferma.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  calendarVisible = true;

  current: Agenda[] = [];
  currentEvent: EventInput[] = [];
  calendarOptions: CalendarOptions;
  agenda: Agenda;
  user: User;

  constructor(
    private modalService: NgbModal,
    private agendaService: AgendaService,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.getAllAgenda();
  }

  ngOnInit(): void {
    this.authService.getUser.subscribe({
      next: (response) => {
        this.user = response;
        console.log(this.user);
      },
    });

    this.getAllAgenda();

    //  this.agendaService.arrInput.subscribe(x=> this.currentEvent = x)
    console.log(this.currentEvent);

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, timeGridPluggin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        start: 'today prev,next',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      weekends: true,
      editable: true,
      selectable: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDidMount: this.handlePopHover.bind(this),
    };
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.modalService
      .open(ModalEventComponent, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          if (!!result) {
            console.log(result.value);
            const calendarApi = selectInfo.view.calendar;
            console.log('cale', calendarApi.view.calendar);

            calendarApi.unselect(); // clear date selection

            var orarioStart = moment(selectInfo.start)
              .add(result.value.timeStart)
              .utc(false)
              .toISOString();
            var orarioEnd = moment(selectInfo.start)
              .add(result.value.timeEnd)
              .toISOString();

            /*       calendarApi.addEvent({
              title: result.value.title,
              start: orarioStart,
              end: orarioEnd,
              startEditable: true,
              description: result.value.description,
            }); */
            this.agenda = {
              masterDate: selectInfo.start,
              startEventTime: result.value.timeStart,
              eventExpired: result.value.timeEnd,
              eventPublic: 'si',
              event: {
                description: result.value.description,
                eventType: { uidEventType: result.value.typeEvent },
                user: { uidUser: this.user.uidUser },
              },
            };

            this.saveEvent(this.agenda);
          }
        },
        (reason) => {}
      );
  }

  handleEventClick(clickInfo: EventClickArg) {
    const modale = this.modalService
      .open(ModaleconfermaComponent).componentInstance.clickInfo = clickInfo.event;
      this.modalService.open(ModaleconfermaComponent).result.then(
        (response)=>{

        }
      )
    }


  getAllAgenda() {
    this.agendaService.getAllAgenda().subscribe({
      next: (response) => {
        this.current = response;
        //   this.getCurrentEvent();
        this.agendaService.arrInput.subscribe((x) => (this.currentEvent = x));
        console.log(this.currentEvent);
      },
    });
  }

  handlePopHover(clickInfo: EventClickArg) {
    return new bootstrap.Popover(clickInfo.el, {
      title: clickInfo.event.title,
      placement: 'auto',

      trigger: 'hover',
      customClass: 'popoverStyle',
      content:
        'Fine Appuntamento' +
        ' ' +
        moment(clickInfo.event.end).format('HH:mm') +
        '. Tipologia:' +
        clickInfo.event.extendedProps['description'],
    });
  }

  saveEvent(agenda: any) {
    this.agendaService.insertAgenda(agenda).subscribe({
      next: (response) => {
        console.log(response);
        this.getAllAgenda();
        this.modalService.dismissAll();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
