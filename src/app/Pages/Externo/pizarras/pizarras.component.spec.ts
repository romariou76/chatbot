import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizarrasComponent } from './pizarras.component';

describe('PizarrasComponent', () => {
  let component: PizarrasComponent;
  let fixture: ComponentFixture<PizarrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizarrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
