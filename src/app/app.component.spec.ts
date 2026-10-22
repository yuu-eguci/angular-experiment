import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should route /index to the index page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/index');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('This is index page');
  });

  it('should route /page1 to page1', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/page1');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('This is page1');
  });
});
