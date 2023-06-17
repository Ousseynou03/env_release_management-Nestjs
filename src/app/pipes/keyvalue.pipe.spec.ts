import { KeyvaluePipe } from './keyvalue.pipe';

describe('UserValuePipe', () => {
  it('create an instance', () => {
    const pipe = new KeyvaluePipe();
    expect(pipe).toBeTruthy();
  });
});
