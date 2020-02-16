import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecherchePage } from './modal-recherche.page';

describe('ModalRecherchePage', () => {
  let component: ModalRecherchePage;
  let fixture: ComponentFixture<ModalRecherchePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRecherchePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecherchePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
