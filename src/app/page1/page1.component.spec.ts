import { TestBed } from '@angular/core/testing';
import { Page1Component } from './page1.component';

describe('Page1Component', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    const fixture = TestBed.createComponent(Page1Component);
    await fixture.whenStable();
    element = fixture.nativeElement;
  });

  it('should render the header', () => {
    expect(element.querySelector('h1')?.textContent?.trim()).toBe('This is page1');
  });

  it('should link to the other pages', () => {
    const hrefs = Array.from(element.querySelectorAll('a')).map(a => a.getAttribute('href'));
    expect(hrefs).toEqual(['index', 'page2', '#', '#']);
  });
});
