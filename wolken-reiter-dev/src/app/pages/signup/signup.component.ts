import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { phoneCodes } from 'src/app/phone-codes';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBreakPoints,
  PhoneCode,
  SignupData,
} from 'src/app/shared/types/types';
import { getHandset } from 'src/app/store/root-store/store/root.selectors';
import { passwordMatchValidator } from 'src/app/validators/password-match.validator';
import { userExistsValidator } from 'src/app/validators/user-exists.validator';
@Component({
  selector: 'app-signup',
  template: `
    <form
      [formGroup]="checkoutForm"
      [ngStyle]="{ width: hostWidth }"
      class="form"
      (ngSubmit)="sendForm()"
    >
      <a class="form__close" mat-mini-fab routerLink="/">
        <mat-icon class="form__close-icon">close</mat-icon>
      </a>
      <ul class="form__list">
        <li class="form__item">
          <mat-form-field
            color="accent"
            class="form__field"
            appearance="outline"
          >
            <mat-label>{{ 'FORM.NAME' | translate }}</mat-label>
            <input formControlName="name" matInput type="text" />
          </mat-form-field>
          <mat-error
            *ngIf="
              checkoutForm.get('name')?.hasError('required') && isButtonPressed
            "
          >
            Name is <strong>required</strong>
          </mat-error>
          <mat-error
            *ngIf="
              checkoutForm.get('name')?.hasError('minlength') && isButtonPressed
            "
          >
            Min length is <strong>2 symbols</strong>
          </mat-error>
          <mat-error
            *ngIf="
              checkoutForm.get('name')?.hasError('maxlength') && isButtonPressed
            "
          >
            Max length is <strong>25 symbols</strong>
          </mat-error>
        </li>
        <li class="form__item">
          <mat-form-field
            color="accent"
            class="form__field"
            appearance="outline"
          >
            <mat-label>{{ 'FORM.SURNAME' | translate }}</mat-label>
            <input formControlName="surname" matInput type="text" />
          </mat-form-field>
          <mat-error
            *ngIf="
              checkoutForm.get('surname')?.hasError('maxlength') &&
              isButtonPressed
            "
          >
            Max length is <strong>25 symbols</strong>
          </mat-error>
        </li>
        <li class="form__item">
          <mat-form-field
            color="accent"
            class="form__field"
            appearance="outline"
          >
            <mat-label>{{ 'FORM.MAIL' | translate }}</mat-label>
            <input formControlName="email" matInput type="text" />
          </mat-form-field>
          <mat-error
            *ngIf="
              checkoutForm.get('email')?.hasError('required') && isButtonPressed
            "
          >
            Email is <strong>required</strong>
          </mat-error>
          <mat-error
            *ngIf="
              checkoutForm.get('email')?.hasError('email') && isButtonPressed
            "
          >
            You should enter <strong>an email</strong>
          </mat-error>
          <mat-error
            *ngIf="
              checkoutForm.get('email')?.hasError('minlength') &&
              isButtonPressed
            "
          >
            Min length is <strong>4 symbols</strong>
          </mat-error>
          <mat-error *ngIf="checkoutForm.get('email')?.hasError('emailExists')">
            The e-mail already <strong>exists</strong>
          </mat-error>
        </li>
        <li class="form__item" formGroupName="phoneGroup">
          <mat-form-field color="accent" class="country" appearance="outline">
            <mat-label>{{ 'FORM.COUNTRY' | translate }}</mat-label>
            <mat-select formControlName="country">
              <mat-option>
                <ngx-mat-select-search
                  [formControl]="codeSearchControl"
                ></ngx-mat-select-search>
              </mat-option>
              <mat-option *ngFor="let code of phoneCodes" [value]="code.code">
                <span class="phone-values">{{ code.flag }}</span>
                <span class="phone-values">{{ code.name }}</span>
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field color="accent" class="code" appearance="outline">
            <mat-label>{{ 'FORM.CODE' | translate }}</mat-label>
            <input
              formControlName="code"
              [readonly]="true"
              matInput
              type="text"
            />
          </mat-form-field>
          <mat-form-field color="accent" class="phone" appearance="outline">
            <mat-label>{{ 'FORM.PHONE' | translate }}</mat-label>
            <input
              [textMask]="{ mask: phoneMaskReg }"
              formControlName="phone"
              matInput
              type="text"
            />
          </mat-form-field>
        </li>
        <ng-container formGroupName="passwordGroup">
          <li class="form__item">
            <mat-form-field
              color="accent"
              class="form__field"
              appearance="outline"
            >
              <mat-label>{{ 'FORM.PASSWORD' | translate }}</mat-label>
              <input formControlName="password" matInput type="text" />
            </mat-form-field>
            <mat-error
              *ngIf="
                checkoutForm
                  .get('passwordGroup')
                  .get('password')
                  .hasError('required') && isButtonPressed
              "
            >
              Password is <strong>required</strong>
            </mat-error>
            <mat-error
              *ngIf="
                checkoutForm
                  .get('passwordGroup')
                  .get('password')
                  .hasError('minlength') && isButtonPressed
              "
            >
              Min length is <strong>8 symbols</strong>
            </mat-error>
            <mat-error
              *ngIf="
                checkoutForm
                  .get('passwordGroup')
                  .get('password')
                  .hasError('pattern') && isButtonPressed
              "
            >
              At least one uppercase letter, one lowercase and one of the
              characters: !@#$%^&*.-
            </mat-error>
          </li>
          <li class="form__item">
            <mat-form-field
              color="accent"
              class="form__field"
              appearance="outline"
            >
              <mat-label>{{ 'FORM.REPEAT' | translate }}</mat-label>
              <input formControlName="r_password" matInput type="text" />
            </mat-form-field>
          </li>
        </ng-container>
        <mat-error
          *ngIf="
            checkoutForm.get('passwordGroup').hasError('passwordMatch') &&
            isButtonPressed
          "
        >
          The password <strong>doesn't match</strong>
        </mat-error>
      </ul>
      <div class="form__buttons">
        <a class="form__login" mat-stroked-button routerLink="/login">{{
          'FORM.LOGIN' | translate
        }}</a>
        <button
          color="warn"
          class="form__signup"
          type="button"
          mat-stroked-button
        >
          {{ 'FORM.SIGNUP' | translate }}
        </button>
        <button color="primary" class="form__submit" mat-raised-button>
          {{ 'FORM.SUBMIT' | translate }}
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isHandset: boolean = false;
  destroy$ = new Subject();
  codeSearchControl: FormControl = new FormControl();
  phoneMaskReg = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  passwordReg = /(?=.*[0-9])(?=.*[!@#$%^&*.-/)(\]\[])(?=.*[a-z])(?=.*[A-Z])/g;
  phoneCodes: PhoneCode[] = phoneCodes;
  hostWidth: FormBreakPoints = FormBreakPoints.SMALL;
  // ставим any из-за невозможности типизировать реативные формы
  // структуру формы можно посмотреть в SignupData
  checkoutForm: any | FormGroup | SignupData | null = null;
  isButtonPressed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private auth: AuthService,
    private router: Router,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.use('en');
    this.subscribeCodeSearch();
    this.subscribeBreakPointsChange();
    this.setForm();
    this.subscribeCountryChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next('unsubscribe');
    this.destroy$.complete();
  }

  subscribeCodeSearch() {
    this.codeSearchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.phoneCodes = phoneCodes.filter((subj) =>
          subj.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
      });
  }

  subscribeCountryChange() {
    this.checkoutForm
      .get('phoneGroup')
      .get('country')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value: string) => {
        const codeObject: PhoneCode | undefined = this.phoneCodes.find(
          (obj) => obj.code === value
        );
        if (!codeObject) return;
        this.checkoutForm
          .get('phoneGroup')
          .get('code')
          .setValue(codeObject.dial_code);
      });
  }

  subscribeBreakPointsChange() {
    this.store
      .pipe(select(getHandset))
      .pipe(takeUntil(this.destroy$))
      .subscribe((isHandset: boolean) => {
        this.isHandset = isHandset;
        this.hostWidth = isHandset
          ? FormBreakPoints.SMALL
          : FormBreakPoints.LARDGE;
      });
  }

  setForm(): void {
    this.checkoutForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      surname: ['', Validators.maxLength(25)],
      email: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.email,
          ],
          asyncValidators: userExistsValidator(this.auth),
          updateOn: 'blur',
        },
      ],
      phoneGroup: this.fb.group({
        country: null,
        code: null,
        phone: null,
      }),
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            {
              validators: [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(this.passwordReg),
              ],
            },
          ],
          r_password: ['', Validators.required],
        },
        { validators: passwordMatchValidator() }
      ),
    });
  }

  prepareForm() {
    const phone = this.checkoutForm.get('phoneGroup').get('phone');
    if (!phone.value) return;
    const numbers = phone.value.match(/\d/g).join('');
    phone.setValue(numbers);
  }

  sendForm() {
    this.isButtonPressed = true;
    this.auth.serverError = null;
    if (!this.checkoutForm.valid) return;
    this.prepareForm();
    this.auth.sendSignupForm(this.checkoutForm.value).subscribe(() => {
      this.setForm();
      this.router.navigate(['/']);
    });
  }
}
