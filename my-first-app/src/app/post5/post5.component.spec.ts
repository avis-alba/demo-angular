import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Post5Component } from './post5.component';

describe('Post5Component', () => {
  let component: Post5Component;
  let fixture: ComponentFixture<Post5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Post5Component]
    });
    fixture = TestBed.createComponent(Post5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
