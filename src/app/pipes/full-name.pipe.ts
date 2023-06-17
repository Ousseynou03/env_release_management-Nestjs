import {Pipe, PipeTransform} from '@angular/core';
import {SessionService} from '../services';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  constructor(private api_service: SessionService) {
  }
  transform(input): any {
    const user = this.api_service.getUserById(input.ajoute_par)
    if (user) {
      input.added_by = user.prenom + ' ' + user.nom
    }
    return input;
  }

}
