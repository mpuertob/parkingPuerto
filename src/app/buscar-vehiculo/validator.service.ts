import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { MyFormControl } from '../validators/myFormControl';
import { MyFormGroup } from '../validators/myformgroup';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  getFormGroup(): any {
    return this.myFormGroup.formGroup;
  }
  validador: string = '^\\d{4}[\\s-][a-zA-Z]{3}$';
  private _myFormGroup: MyFormGroup;
  regex = '';
  private nombreCampos = ['matricula'];
  public nombreControles = ['controlMatricula'];
  private controles = [
    new MyFormControl('', [Validators.pattern(this.validador)]),
  ];

  constructor() {
    this._myFormGroup = new MyFormGroup(
      this.nombreCampos,
      this.nombreControles,
      this.controles
    );
    this.myFormGroup.insertarValidationMessages(
      'controlMatricula',
      ['pattern'],
      ['Matricula mal formulada, Format: 1234-ABC']
    );
  }

  public get myFormGroup(): MyFormGroup {
    return this._myFormGroup;
  }

  validateControl(element): boolean {
    return (
      this.myFormGroup.getControl(element).dirty &&
      !this.myFormGroup.getControl(element).valid
    );
  }

  getErrorMessage(control) {
    let algo = this.myFormGroup.getControl(control);
    let errores = algo.errors;
    return algo.getValidationMessage(Object.keys(errores)[0]);
  }
}
