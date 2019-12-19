import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UtilService } from './util.service';

export class FormHelperService {

  public static fillForm(form: FormGroup, obj: any, emitEvent = false) {
    if (obj) {
      Object.keys(obj).forEach(key => {
        if (form.get(key)) {
          if (UtilService.isObject(obj[key])) {
            FormHelperService.fillForm(form.get(key) as FormGroup, obj[key]);
          } else if (UtilService.isString(obj[key]) || UtilService.isNumber(obj[key]) ||
            UtilService.isBoolean(obj[key]) || UtilService.isArray(obj[key])) {
            if (form.get(key) instanceof FormControl) {
              form.get(key).setValue(obj[key], {emitEvent});
            } else if (form.get(key) instanceof FormArray && UtilService.isArray(obj[key])) {
              obj[key].forEach((sobj, indx) => {
                if (UtilService.isString(sobj) || UtilService.isNumber(sobj) || UtilService.isBoolean(sobj)) {
                  (form.get(key) as FormArray).at(indx).setValue(sobj, {emitEvent});
                } else if ((form.get(key) as FormArray).at(indx) instanceof FormGroup && UtilService.isObject(sobj)) {
                  FormHelperService.fillForm((form.get(key) as FormArray).at(indx) as FormGroup, sobj);
                }
              });
            }
          }
        }
      });
    }
  }

}
