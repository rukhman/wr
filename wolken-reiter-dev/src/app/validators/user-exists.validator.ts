import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export  const userExistsValidator = (authService: AuthService): AsyncValidatorFn => {
 return (control: AbstractControl): Observable<{ emailExists: boolean }> => {
  return authService.checkEmail(control.value).pipe(map((response: any) => response.emailExists ? response : null))
 }
}
