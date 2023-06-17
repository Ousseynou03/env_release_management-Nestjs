import { PendingRequestsPipe } from './pending-requests.pipe';

describe('PendingRequestsPipe', () => {
  it('create an instance', () => {
    const pipe = new PendingRequestsPipe();
    expect(pipe).toBeTruthy();
  });
});
