import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modaleconferma',
  templateUrl: './modaleconferma.component.html',
  styleUrls: ['./modaleconferma.component.scss']
})
export class ModaleconfermaComponent  implements OnInit{

  constructor(public modal: NgbActiveModal , private modaleService:NgbModal){}
  @Input() public clickInfo

  ngOnInit(): void {
    this.modaleService.activeInstances.asObservable();
    console.log(this.modaleService.activeInstances.asObservable());
    console.log(this.clickInfo);

  }
;
}
