import {throwError as observableThrowError,  Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/catch';


export class BaseService {

  constructor(protected _http: HttpClient) { }

  getRequest(url, backend = false): Observable<any> {
    let headers: HttpHeaders;
    if (backend) {
      headers = new HttpHeaders({
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJGbGFnc2hpcCIsInN1YiI6IjIwODQyNjMzMTQxMjgzNzI3MzciLCJhdWQiOiJmbGFnc2hpcC1jbGllbnQiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTcwNjY1NzAyLCJleHAiOjE1NzA3NTIxMDJ9.P6P6P2oRRRjcROFWxydbhCfOZhA9DHESCJ8JlkpAiMt6AtvieBsLbgGzpxjIHQs1IILXieXKvLtwEdUngd_GuA_hQpTrFEAVucgkqtVVapF3PMRhGH0Xxn1PIvjvh2-8q9vWg_wNLYaBw37kHyZxE6Z0O_aQsirG5IUIJdolZD2xQ98EEExEjd-u8BpkziE4VieZnPYNQTqwpUfg11ayJF7c4F0wn2VBMCIq43KKmTKxxISz1wFepeHX-ytst3ttJu2pFXkZbC0G2644XwbEqrlZBl5GZ2icIcSpWc1bJOZwdi3p8Qn1qPRsgYF3mTYueHRLXvQMWIyxGCaHsjaX5w`, 'Content-type': 'application/x-www-form-urlencoded',
      });
    } else {
      headers = new HttpHeaders({
        'Content-type': 'application/json'
      });
    }
    const options = { headers: headers };
    return this._http.get(url,  options);
  }

  deleteRequest(url, backend = false) {
    let headers: HttpHeaders;
    if (backend) {
      headers = new HttpHeaders({
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJGbGFnc2hpcCIsInN1YiI6IjIwODQyNjMzMTQxMjgzNzI3MzciLCJhdWQiOiJmbGFnc2hpcC1jbGllbnQiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTcwNjY1NzAyLCJleHAiOjE1NzA3NTIxMDJ9.P6P6P2oRRRjcROFWxydbhCfOZhA9DHESCJ8JlkpAiMt6AtvieBsLbgGzpxjIHQs1IILXieXKvLtwEdUngd_GuA_hQpTrFEAVucgkqtVVapF3PMRhGH0Xxn1PIvjvh2-8q9vWg_wNLYaBw37kHyZxE6Z0O_aQsirG5IUIJdolZD2xQ98EEExEjd-u8BpkziE4VieZnPYNQTqwpUfg11ayJF7c4F0wn2VBMCIq43KKmTKxxISz1wFepeHX-ytst3ttJu2pFXkZbC0G2644XwbEqrlZBl5GZ2icIcSpWc1bJOZwdi3p8Qn1qPRsgYF3mTYueHRLXvQMWIyxGCaHsjaX5w`, 'Content-type': 'application/x-www-form-urlencoded',
      });
    } else {
      headers = new HttpHeaders({
        'Content-type': 'application/json'
      });
    }
    const options = { headers: headers };
    return this._http.delete(url, options)
  }

  postRequest(url, params, backend = true) {
    let headers: HttpHeaders;
    if (backend) {
      headers = new HttpHeaders({
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJGbGFnc2hpcCIsInN1YiI6IjIwODQyNjMzMTQxMjgzNzI3MzciLCJhdWQiOiJmbGFnc2hpcC1jbGllbnQiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTcwNjY1NzAyLCJleHAiOjE1NzA3NTIxMDJ9.P6P6P2oRRRjcROFWxydbhCfOZhA9DHESCJ8JlkpAiMt6AtvieBsLbgGzpxjIHQs1IILXieXKvLtwEdUngd_GuA_hQpTrFEAVucgkqtVVapF3PMRhGH0Xxn1PIvjvh2-8q9vWg_wNLYaBw37kHyZxE6Z0O_aQsirG5IUIJdolZD2xQ98EEExEjd-u8BpkziE4VieZnPYNQTqwpUfg11ayJF7c4F0wn2VBMCIq43KKmTKxxISz1wFepeHX-ytst3ttJu2pFXkZbC0G2644XwbEqrlZBl5GZ2icIcSpWc1bJOZwdi3p8Qn1qPRsgYF3mTYueHRLXvQMWIyxGCaHsjaX5w`, 'Content-type': 'application/x-www-form-urlencoded',
      });
    } else {
      headers = new HttpHeaders({
        'Content-type': 'application/json'
      });
    }
    const options = { headers: headers };

    return this._http.post(url, params, options)
  }

  putRequest(url, params, additionalHeaders: any = null) {
    const token = localStorage.getItem('bo::token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
      'X-API-KEY': environment.X_API_KEY
    });

    if (additionalHeaders) {
      Object.keys(additionalHeaders).forEach((key: string) => {
        headers.append(key, additionalHeaders[key])
      })
    }
    const options = { headers: headers };

    return this._http
        .put(url, params, options).pipe(
            catchError(e => {
              if (e.status === 401) {
                this.redirect();
                return observableThrowError('Unauthorized');
              }
              return observableThrowError(e);
            }));
  }

  redirect() {
    localStorage.clear();
    if (window.location.pathname !== '/sign_in') {
      window.location.href = '/sign_in';
    }
  }

}
