import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from "./login.component";
import { LoginService } from './login.service';

describe('the login component', () => {
  describe('with a logged in user', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let deMessage: DebugElement;
    let elMessage: HTMLElement;

    let stubbedLoginService: LoginService;



    beforeEach(() => {

      stubbedLoginService = {
        isloggedIn: true,
        getUserName: () => 'Ben Solo'
      };

      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [{ provide: LoginService, useValue: stubbedLoginService }]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;

      deMessage = fixture.debugElement.query(By.css('[data-login-message'));

      elMessage = deMessage.nativeElement;
      fixture.detectChanges();
    });

    it('should display a logged in user', () => {
      expect(elMessage.textContent).toBe('Welcome, Ben Solo');
    });

  });

  describe('without a non-logged in user', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let deMessage: DebugElement;
    let elMessage: HTMLElement;

    let stubbedLoginService: LoginService;



    beforeEach(() => {

      stubbedLoginService = {
        isloggedIn: false,
        getUserName: () => 'Ben Solo'
      };

      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [{ provide: LoginService, useValue: stubbedLoginService }]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;

      deMessage = fixture.debugElement.query(By.css('[data-login-message'));

      elMessage = deMessage.nativeElement;
      fixture.detectChanges();
    });

    it('should display a logged in user', () => {
      expect(elMessage.textContent).toBe('You as not logged in');
    });
  });

});
