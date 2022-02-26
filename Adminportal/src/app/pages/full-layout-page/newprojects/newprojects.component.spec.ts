import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewprojectsComponent } from './newprojects.component';

describe('NewprojectsComponent', () => {
  let component: NewprojectsComponent;
  let fixture: ComponentFixture<NewprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewprojectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
