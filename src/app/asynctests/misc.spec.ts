import { first } from 'rxjs/operators';
import { add, getFavoriteForeignFilm, returnsAnObservable } from './misc';

describe('a synchronous call', () => {
  it('can add 2 numbers together', () => {
    const answer = add(2, 3);
    expect(answer).toBe(5);
  });
});

describe('promises', () => {
  it('can be tricky', (done) => {
    const result = getFavoriteForeignFilm();

    result.then(a => {
      expect(a).toBe('Harakiri');
      // include thisdone - indiactes the job is done and not to
      // evaluate until then
      done();
    });

  });

  it('using await', async () => {
    // only works with async keyword and in es6 - await only works on
    // stuff with a "then" method on it. Accomplishes sam as above
    // but better of the 2 ways.

    const result = await getFavoriteForeignFilm();
    expect(result).toBe('Harakiri');

  });


});

describe('using observables', () => {
  it('using done', (done) => {
    returnsAnObservable().subscribe(r => {
      expect(r).toBe('Eggs');
      done();
    });
  });

  it('using async await', async () => {
    const meal = await returnsAnObservable().pipe(
      first() // processes the first answer that comes through
    ).toPromise();

    expect(meal).toBe('Eggs');
  });
});
