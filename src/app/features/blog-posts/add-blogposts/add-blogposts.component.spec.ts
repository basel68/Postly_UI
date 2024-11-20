import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogpostsComponent } from './add-blogposts.component';

describe('AddBlogpostsComponent', () => {
  let component: AddBlogpostsComponent;
  let fixture: ComponentFixture<AddBlogpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBlogpostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlogpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
