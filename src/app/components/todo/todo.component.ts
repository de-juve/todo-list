import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormHelperService } from '../../services/form-helper.service';
import { ITodo } from '../../models/todo.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Moment } from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

const MY_DATEPICKER_MOMENT_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'dmb-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [
   // CUSTOM_SELECT_DATE_CONTROL_VALUE_ACCESSOR,
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ru-Ru'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATEPICKER_MOMENT_FORMATS}
  ]
})
export class TodoComponent implements OnInit, OnChanges {
  @Input() todo: ITodo;
  @Output() save = new EventEmitter<ITodo>();
  @Output() cancel = new EventEmitter();

  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
    date: new FormControl(''),
    sort: new FormControl(null)
  });
  date: Moment = null;
  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fillForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.todo) {
      this.fillForm();
    }
  }

  private fillForm() {
    if (!! this.todo) {
      FormHelperService.fillForm(this.form, this.todo);
      this.form.get('date').setValue(moment(this.todo.date));
    } else {
      this.form.reset();
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    } else {
     this.snackBar.open('Неправильно заполнена форма задачи', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
