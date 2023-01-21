import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export  const userNotExistsValidator = (authService: AuthService): AsyncValidatorFn => {
 return (control: AbstractControl): Observable<{ emailNotExists: boolean } | null> => {
  return authService.checkEmail(control.value).pipe(map((response: any) => {
    return !response.emailExists ? { emailNotExists: true } : null
  }))
 }
}
