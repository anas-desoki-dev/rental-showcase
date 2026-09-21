import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Lang = 'en' | 'ar';

const DICT: Record<Lang, Record<string, string>> = {
  en: {
    title: 'Rental Showcase',
    switchTo: 'العربية',
    all: 'All',
    car: 'Cars',
    yacht: 'Yachts',
    helicopter: 'Helicopters',
    buggy: 'Buggies',
    loading: 'Loading...',
    loadError: 'Could not load listings. Please try again.',
    noListings: 'No listings found.',
    notFound: 'Listing not found.',
    back: '← Back to listings',
    currency: 'AED',
    perDay: '/ day',
    bookTitle: 'Book this experience',
    fName: 'Full name',
    fEmail: 'Email',
    fPhone: 'Phone (e.g. +971501234567)',
    fDate: 'Date',
    fDays: 'Number of days',
    fNotes: 'Notes (optional)',
    total: 'Total',
    submitBtn: 'Request booking',
    bookSuccess:
      'Thanks! Your booking request was received (demo only, nothing was sent).',
    bookAnother: 'New request',
    errRequired: 'This field is required.',
    errMinName: 'Name must be at least 3 characters.',
    errEmail: 'Enter a valid email.',
    errPhone: 'Enter 8–15 digits, optionally starting with +.',
    errPast: 'Date cannot be in the past.',
    errDays: 'Days must be between 1 and 30.',
    seoListTitle: 'Luxury Rentals: Cars, Yachts & More | Rental Showcase',
    seoListDesc:
      'Browse luxury rentals: sports cars, yachts, helicopter tours and desert buggies. Filter by category and request a booking in English or Arabic.',
  },
  ar: {
    title: 'معرض الإيجار',
    switchTo: 'English',
    all: 'الكل',
    car: 'سيارات',
    yacht: 'يخوت',
    helicopter: 'هليكوبتر',
    buggy: 'دراجات صحراوية',
    loading: 'جاري التحميل...',
    loadError: 'تعذّر تحميل العروض. حاول مرة أخرى.',
    noListings: 'لا توجد عروض.',
    notFound: 'العرض غير موجود.',
    back: 'العودة إلى العروض →',
    currency: 'د.إ',
    perDay: '/ يوم',
    bookTitle: 'احجز هذه التجربة',
    fName: 'الاسم الكامل',
    fEmail: 'البريد الإلكتروني',
    fPhone: 'رقم الهاتف (مثال: +971501234567)',
    fDate: 'التاريخ',
    fDays: 'عدد الأيام',
    fNotes: 'ملاحظات (اختياري)',
    total: 'الإجمالي',
    submitBtn: 'أرسل طلب الحجز',
    bookSuccess: 'شكراً! تم استلام طلب الحجز (نسخة تجريبية، لم يُرسل شيء).',
    bookAnother: 'طلب جديد',
    errRequired: 'هذا الحقل مطلوب.',
    errMinName: 'يجب ألا يقل الاسم عن ٣ أحرف.',
    errEmail: 'أدخل بريداً إلكترونياً صحيحاً.',
    errPhone: 'أدخل من ٨ إلى ١٥ رقماً، ويمكن أن يبدأ بـ +.',
    errPast: 'لا يمكن أن يكون التاريخ في الماضي.',
    errDays: 'يجب أن تكون الأيام بين ١ و٣٠.',
    seoListTitle: 'تأجير فاخر: سيارات ويخوت وأكثر | معرض الإيجار',
    seoListDesc:
      'تصفّح تجارب التأجير الفاخرة: سيارات رياضية ويخوت وجولات بالهليكوبتر ودراجات صحراوية. صفّ حسب الفئة واطلب الحجز بالعربية أو الإنجليزية.',
  },
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private doc = inject(DOCUMENT);
  lang = signal<Lang>('en');
  dir = computed(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));

  constructor() {
    // كل ما اللغة تتغير، نحدّث lang و dir على عنصر <html>
    effect(() => {
      this.doc.documentElement.lang = this.lang();
      this.doc.documentElement.dir = this.dir();
    });
  }

  toggle() {
    this.lang.update((l) => (l === 'en' ? 'ar' : 'en'));
  }

  t(key: string): string {
    return DICT[this.lang()][key] ?? key;
  }
}
