import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dw-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.css'],
})
export class NewBudgetComponent implements OnInit {
  public budgetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<NewBudgetComponent>) {}

  public ngOnInit() {
    this.budgetForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: [''],
      endDate: [''],
    });
  }

  public submit() {
    const { startDate, endDate, name } = this.budgetForm.value;
    this.dialogRef.close({ startDate, endDate, name });
  }
}
