import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutadorDashboardComponent } from './recrutador-dashboard.component';

describe('RecrutadorDashboardComponent', () => {
  let component: RecrutadorDashboardComponent;
  let fixture: ComponentFixture<RecrutadorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecrutadorDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecrutadorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
