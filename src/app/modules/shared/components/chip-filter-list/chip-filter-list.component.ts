import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dw-chip-filter-list',
  templateUrl: './chip-filter-list.component.html',
  styleUrls: ['./chip-filter-list.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ChipFilterListComponent), multi: true }],
})
export class ChipFilterListComponent implements ControlValueAccessor {
  @Input() public chips: string[];
  @Input() public orientation: 'horizontal' | 'vertical' = 'horizontal';
  private value: string[] = [];
  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdRef: ChangeDetectorRef) {}

  public onChipSelect(chip: string) {
    this.value = [...new Set([...this.value, chip])];
    this.onChange(this.value);
    this.onTouched();
  }

  public onChipDeselect(chip: string) {
    const index = this.value.indexOf(chip);
    if (index !== -1) {
      this.value.splice(index, 1);
      this.onChange(this.value);
      this.onTouched();
    }
  }

  public writeValue(value: string[]) {
    this.value = [...(value || [])];
    this.onChange(this.value);
    this.cdRef.markForCheck();
  }

  public registerOnChange(onChange: (value: string[]) => void) {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  public chipSelected(chip: string) {
    return this.value.includes(chip);
  }
}
