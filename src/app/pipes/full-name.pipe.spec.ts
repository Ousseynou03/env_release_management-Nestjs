import { FullNamePipe } from './full-name.pipe';
import {SessionService} from "../services";

describe('FullNamePipe', () => {
  it('create an instance', () => {
    let api_service: SessionService;
    const pipe = new FullNamePipe(api_service);
    expect(pipe).toBeTruthy();
  });
});
