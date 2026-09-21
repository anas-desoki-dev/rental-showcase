import { Component, Input, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { Listing } from '../../models/listing';

// تاريخ النهارده بصيغة yyyy-mm-dd (بالتوقيت المحلي)
function todayStr(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

// validator مخصص: التاريخ مينفعش يكون في الماضي
export function notPastDate(control: AbstractControl): ValidationErrors | null {
  return !control.value || control.value >= todayStr()
    ? null
    : { pastDate: true };
}

type FieldName = 'name' | 'email' | 'phone' | 'date' | 'days';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css',
})
export class BookingFormComponent {
  @Input({ required: true }) listing!: Listing;

  private fb = inject(FormBuilder);
  i18n = inject(LanguageService);

  today = todayStr();
  submitted = false;
  success = false;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{8,15}$/)]],
    date: ['', [Validators.required, notPastDate]],
    days: [1, [Validators.required, Validators.min(1), Validators.max(30)]],
    notes: [''],
  });

  get total(): number {
    const days = Number(this.form.controls.days.value);
    return days > 0 ? days * this.listing.pricePerDay : 0;
  }

  // بيرجّع مفتاح رسالة الخطأ (أو null لو مفيش خطأ يتعرض)
  errorKey(name: FieldName): string | null {
    const c = this.form.controls[name];
    if (c.valid || !(c.touched || this.submitted)) return null;
    if (c.hasError('required')) return 'errRequired';
    if (c.hasError('minlength')) return 'errMinName';
    if (c.hasError('email')) return 'errEmail';
    if (c.hasError('pattern')) return 'errPhone';
    if (c.hasError('pastDate')) return 'errPast';
    return 'errDays';
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // في تطبيق حقيقي هنا بنبعت الطلب للـAPI
    this.success = true;
  }

  reset() {
    this.form.reset({ days: 1 });
    this.submitted = false;
    this.success = false;
  }
}
