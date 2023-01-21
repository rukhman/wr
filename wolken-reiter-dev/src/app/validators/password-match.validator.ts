import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return function (formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get("password") as FormControl;
    const confirm = formGroup.get("r_password") as FormControl;
    if(password.value === confirm.value) {
      confirm.setErrors(null)
    } else {
      confirm.setErrors({ 'any': true })
    }
    return password.value === confirm.value ? null : {
      passwordMatch: true
    }
  }
}
