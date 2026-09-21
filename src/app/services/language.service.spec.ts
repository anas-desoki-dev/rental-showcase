import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('switches to RTL when Arabic is selected', () => {
    expect(service.dir()).toBe('ltr');
    service.toggle();
    expect(service.lang()).toBe('ar');
    expect(service.dir()).toBe('rtl');
  });

  it('translates keys according to the current language', () => {
    expect(service.t('all')).toBe('All');
    service.toggle();
    expect(service.t('all')).toBe('الكل');
  });
});
