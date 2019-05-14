import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BookDataService } from './book-data.service';
import { BookListItem } from './models';

describe('the data service', () => {
  describe('getting some books happy path', () => {
    let injector: TestBed;
    let service: BookDataService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [BookDataService],
        imports: [HttpClientTestingModule]
      });

      injector = getTestBed();
      service = injector.get(BookDataService);
      httpMock = injector.get(HttpTestingController);
    });

    it('get some books', () => {
      // call get books on the service.

      const booksFromServer: BookListItem[] = [
        { id: '99', title: 'War of the worlds' },
        { id: '384', title: 'Faust' }
      ];

      let result: BookListItem[];
      service.getBooks().subscribe(books => {
        // do something here maybe.
        result = books;
      });

      // then: there should be a GET request on the corrent URL (url, method)
      const req = httpMock.expectOne('http://someserver/books');

      expect(req.request.method).toBe('GET');

      req.flush({ data: booksFromServer }); // this will complete the call and execute the subscribe method.

      // did it transform the data properly {data: BookListItem[] => BookListItem[]}

      expect(result).toEqual(booksFromServer);
    });

  });
});
