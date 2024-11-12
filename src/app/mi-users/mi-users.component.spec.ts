import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiUsersComponent } from './mi-users.component';

describe('MiUsersComponent', () => {
  let component: MiUsersComponent;
  let fixture: ComponentFixture<MiUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
