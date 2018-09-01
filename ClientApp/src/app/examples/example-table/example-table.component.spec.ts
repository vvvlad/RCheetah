
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleTableComponent } from './example-table.component';

describe('ExampleTableComponent', () => {
  let component: ExampleTableComponent;
  let fixture: ComponentFixture<ExampleTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
