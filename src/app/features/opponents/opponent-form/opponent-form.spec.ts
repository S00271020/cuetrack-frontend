import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpponentForm } from './opponent-form';

describe('OpponentForm', () => {
  let component: OpponentForm;
  let fixture: ComponentFixture<OpponentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpponentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(OpponentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
