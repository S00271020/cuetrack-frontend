import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpponentList } from './opponent-list';

describe('OpponentList', () => {
  let component: OpponentList;
  let fixture: ComponentFixture<OpponentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpponentList],
    }).compileComponents();

    fixture = TestBed.createComponent(OpponentList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
