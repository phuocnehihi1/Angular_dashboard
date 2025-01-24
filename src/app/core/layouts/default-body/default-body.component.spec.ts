import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultBodyComponent } from './default-body.component';

describe('DefaultBodyComponent', () => {
  let component: DefaultBodyComponent;
  let fixture: ComponentFixture<DefaultBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
