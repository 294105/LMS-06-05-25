import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoaderComponent } from './app-loader.component';

describe('AppLoaderComponent', () => {
  let component: AppLoaderComponent;
  let fixture: ComponentFixture<AppLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
