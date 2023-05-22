import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleconfermaComponent } from './modaleconferma.component';

describe('ModaleconfermaComponent', () => {
  let component: ModaleconfermaComponent;
  let fixture: ComponentFixture<ModaleconfermaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleconfermaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleconfermaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
