import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './components/basic/basic.component';
import { BookDataService } from './components/book-data.service';
import { BookListComponent } from './components/book-list/book-list.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './components/login/login.service';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { reducers } from './reducers';


@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    LoginComponent,
    BookListComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument()
  ],
  providers: [LoginService, BookDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
