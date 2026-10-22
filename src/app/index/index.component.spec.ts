import { TestBed } from '@angular/core/testing';
import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    const fixture = TestBed.createComponent(IndexComponent);
    await fixture.whenStable();
    element = fixture.nativeElement;
  });

  it('should render the header and the project name twice', () => {
    expect(element.querySelector('h1')?.textContent?.trim()).toBe('This is index page');
    const projectNames = Array.from(element.querySelectorAll('p')).map(p => p.textContent?.trim());
    expect(projectNames).toEqual(['angular-experiment', 'angular-experiment']);
  });

  it('should link to the other pages', () => {
    const hrefs = Array.from(element.querySelectorAll('a')).map(a => a.getAttribute('href'));
    expect(hrefs).toEqual(['page1', 'page2', '#', '#']);
  });
});
