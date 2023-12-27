import { UpperCasePipe } from './upper-case.pipe';

describe('UpperCasePipe', () => {
  it('create an instance', () => {
    const pipe = new UpperCasePipe();
    expect(pipe).toBeTruthy();
  });
});
