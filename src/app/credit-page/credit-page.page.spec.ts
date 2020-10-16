import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditPagePage } from './credit-page.page';

describe('CreditPagePage', () => {
  let component: CreditPagePage;
  let fixture: ComponentFixture<CreditPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
