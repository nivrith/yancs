import {
  yancs
} from './../src/index';
import {
  expect
} from 'chai';

describe('yancs', () => {

  it('Should work', () => {
    return yancs(function *(): Iterator<any>{});
  });

  it('Should yield promises', () => {
    return yancs(function *(): Iterator<any>{
      let four = yield Promise.resolve(4);
      expect(four).to.equal(4);
    });
  });

  it('Should yield arrays', () => {
    return yancs(function *(): Iterator<any>{
      let arr = yield [1,2,3,4];
      expect(arr).to.have.members([1,2,3,4]);
    });
  });

  it('Should yield arrays', () => {
    return yancs(function *(): Iterator<any>{
      let arr = yield [1,2,3,4].map(x => x*2);
      expect(arr).to.have.members([2,4,6,8]);
    });
  });

  it('Should yield objects', () => {
    return yancs(function *(): Iterator<any>{
      let obj = yield {
        test: 'object'
      };
      expect(obj).to.have.haveOwnProperty('test');
    });
  });

  it('Should yield thunks', () => {
    return yancs(function *(): Iterator<any>{
      let evaluatedThunk = yield () => 9999 * 9999 ;
      expect(evaluatedThunk).to.equal(9999 * 9999);
    });
  });

  it('Should yield thunks that return promises', () => {
    return yancs(function *(): Iterator<any>{
      let evaluatedThunk = yield () => Promise.resolve(9999 * 9999);
      expect(evaluatedThunk).to.equal(9999 * 9999);
    });
  });

  it('Should yield generators', () => {
    return yancs(function *(): Iterator<any>{
      let evaluatedGen = yield function* () {
        return 'hello world'
      };
      expect(evaluatedGen).to.equal('hello world');
    });
  });

  it('Should yield Async generator that returns Promise', () => {
    return yancs(async function *(): AsyncIterator<any>{
      let evaluatedGen = yield function* () {
        return Promise.resolve('hello world');
      };
      expect(evaluatedGen).to.equal('hello world');
    });
  });

  it('Should yield Async generators', () => {
    return yancs(async function *(): AsyncIterator<any>{
      let evaluatedGen = yield function* () {
        return Promise.resolve('hello world');
      };
      expect(evaluatedGen).to.equal('hello world');
    });
  });
});
