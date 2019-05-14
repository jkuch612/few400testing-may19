import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { click } from '../../testing.utils/index';
import { BasicComponent } from './basic.component';

describe('actually testing a component', () => {
  let component: BasicComponent;
  let fixture: ComponentFixture<BasicComponent>;
  let deMessage: DebugElement;
  let elMessage: HTMLElement;
  let deButton: DebugElement;

  beforeEach(() => {
    // create a fake module for component to exist with
    TestBed.configureTestingModule({
      declarations: [BasicComponent]
    }).compileComponents();

    // tell the module to create an instance of that component
    fixture = TestBed.createComponent(BasicComponent); // app component selector

    // get the instance of the component
    component = fixture.componentInstance;

    //console.log(component.message);
    // Get a reference to the UI Elements that we need to look at or interact with
    deMessage = fixture.debugElement.query(By.css('[data-basic-message]'));
    elMessage = deMessage.nativeElement;
    deButton = fixture.debugElement.query(By.css('[data-basic-button]'));
    fixture.detectChanges(); // there is an autodetect changes

  });

  it('has the right default message', () => {
    expect(elMessage.textContent).toBe('Hello, World!');
  });

  describe('clciking the button changes the message', () => {
    // how to click button ? depends
    // Is it a debug or a html element?
    beforeEach(() => {
      // deButton.triggerEventHandler('click', {});
      click(deButton);
      fixture.detectChanges();
    });

    it('should have the correct message', () => {
      expect(elMessage.textContent).toBe('Thanks!');
    });
  });
});

xdescribe('testing the class directly', () => {
  let component: BasicComponent;
  beforeEach(() => {
    component = new BasicComponent();
  });

  it('should have a default message', () => {
    expect(component.message).toBe('Hello, World!');
  });

  describe('clicking the button', () => {
    beforeEach(() => {
      component.changeMessage();
    });

    it('should change the message', () => {
      expect(component.message).toBe('Thanks!');
    });
  });
});
