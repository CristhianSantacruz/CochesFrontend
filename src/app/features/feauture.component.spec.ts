import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeautureComponent } from './feauture.component';

describe('FeautureComponent', () => {
  let component: FeautureComponent;
  let fixture: ComponentFixture<FeautureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeautureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeautureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
