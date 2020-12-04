import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dw-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
})
export class CreateColumnComponent implements OnInit {
  public columnNameControl: FormControl;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.columnNameControl = this.formBuilder.control('', Validators.required);
  }
}
