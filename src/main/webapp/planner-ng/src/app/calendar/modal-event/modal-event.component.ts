import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastDateOfMonth } from '@syncfusion/ej2-angular-schedule';
import * as moment from 'moment';
import { EventType } from 'src/app/models/eventType.model';
import { EventtypeService } from 'src/app/services/EventType/eventtype.service';

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.scss'],
})
export class ModalEventComponent implements OnInit {
  eventType: EventType[] = [];

  eventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    typeEvent: new FormControl(''),
    timeStart: new FormControl('', [Validators.required]),
    timeEnd: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });
  constructor(
    private eventTypeService: EventtypeService,
    private modalService: NgbActiveModal
  ) {}

  get form() {
    return this.eventForm.controls;
  }

  ngOnInit(): void {
    this.getAllEventType();
  }

  getAllEventType() {
    this.eventTypeService.getAllEvent().subscribe({
      next: (response) => {
        this.eventType = response;
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }

  closeModal() {
    this.modalService.close();
  }

  onSubmit(value: any) {
    this.modalService.close(value);
  }

  changeEventName(value: string): string {
    switch (value) {
      case 'ID_MEETING':
        return 'Meeting';
        break;
      case 'ID_ORGANIZER':
        return 'Organizer';
        break;
      case 'ciao':
        return 'CIAO';
        break;
      case 'ID_PROVA':
        return 'Prova';
        break;
    }
    return value;
  }

  getTimeError(): string {
    var time1 = this.form.timeStart;
    var time2 = this.form.timeEnd;
    var firstTime;
    var orarioFirst;
    var secondTime;
    var orarioSecond;

    firstTime = time1.value.split(':');
    orarioFirst = new Date().setHours(
      Number(firstTime[0]),
      Number(firstTime[1])
    );

    secondTime = time2.value.split(':');
    orarioSecond = new Date().setHours(
      Number(secondTime[0]),
      Number(secondTime[1])
    );

    if (time2.touched || time2.dirty) {
      if (moment(orarioSecond).isAfter(orarioFirst)) {
        this.eventForm.controls['timeStart'].setErrors(null);
        return '';
      }else if(moment(orarioSecond).isSame(orarioFirst)){
        this.eventForm.controls['timeStart'].setErrors({'incorrect': true})
        return 'modaleEvent.errorSame';
      }
       else {
        this.eventForm.controls['timeStart'].setErrors({'incorrect': true})
        return 'modaleEvent.errorAfter';
      }
    }
    return '';
  }


}



