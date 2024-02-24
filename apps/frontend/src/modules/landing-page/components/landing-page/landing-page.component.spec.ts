import { TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LandingPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageComponent, NoopAnimationsModule],
      providers: [MockProvider(Store), MockProvider(ActivatedRoute)],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    expect(fixture).toBeDefined();
  });

  it('should render app name and caption in banner', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const banner = fixture.nativeElement.querySelector(
      '.landing-page .landing-page__banner'
    );
    expect(banner.querySelector('h1').innerHTML).toContain('API Assistant');
    expect(banner.querySelector('h4').innerHTML).toContain(
      'Declarative Backend for trivial apps'
    );
  });

  it('should render links to dashboard and logout in the header if user is authenticated', () => {
    TestBed.overrideProvider(Store, {
      useValue: {
        select: () => of(true),
      },
    });
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('.landing-page header');
    expect(header.querySelector('a').innerHTML).toBe('Go to app');
    expect(header.querySelector('button').innerHTML).toContain('Logout');
  });

  it('should render links to signup and signin in the header if user is not authenticated', () => {
    TestBed.overrideProvider(Store, {
      useValue: {
        select: () => of(false),
      },
    });
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('.landing-page header');
    expect(header.querySelector('a:first-child').innerHTML).toBe('Signup');
    expect(header.querySelector('a:last-child').innerHTML).toContain('Login');
  });

  it('should render link to dashboard in the footer if user is authenticated', () => {
    TestBed.overrideProvider(Store, {
      useValue: {
        select: () => of({}),
      },
    });
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const footer = fixture.nativeElement.querySelector('.landing-page footer');
    expect(footer.innerHTML).toContain('Start building applications rapidly');
    expect(footer.querySelector('a').innerHTML).toBe('API Assistant');
  });

  it('should render link to signup in the footer if user is not authenticated', () => {
    TestBed.overrideProvider(Store, {
      useValue: {
        select: () => of(null),
      },
    });
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const footer = fixture.nativeElement.querySelector('.landing-page footer');
    expect(footer.innerHTML).toContain(
      'Want to build application with API Assistant?'
    );
    expect(footer.querySelector('a').innerHTML).toBe('Signup here');
  });

  it('should render features card', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const featuresCard = fixture.nativeElement.querySelector(
      '.landing-page__features'
    );
    expect(
      featuresCard.querySelectorAll('.landing-page__feature-card').length
    ).toBe(4);
  });
});
