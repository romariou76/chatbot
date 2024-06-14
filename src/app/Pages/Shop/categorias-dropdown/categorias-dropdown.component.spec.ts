import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasDropdownComponent } from './categorias-dropdown.component';

describe('CategoriasDropdownComponent', () => {
  let component: CategoriasDropdownComponent;
  let fixture: ComponentFixture<CategoriasDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriasDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
