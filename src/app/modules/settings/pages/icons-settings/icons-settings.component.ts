import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SettingsForms } from '@modules/settings/forms';
import { NgFormsManager } from '@ngneat/forms-manager';
import { AlertService } from '@services/alert.service';
import Fuse from 'fuse.js';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Icon } from 'src/app/state/icon/icon.model';
import { IconQuery } from 'src/app/state/icon/icon.query';
import { IconService } from 'src/app/state/icon/icon.service';

@Component({
  selector: 'dw-icons-settings',
  templateUrl: './icons-settings.component.html',
  styleUrls: ['./icons-settings.component.scss'],
})
export class IconsSettingsComponent implements OnInit {
  public icons$: Observable<Icon[]>;

  public newIconForm: FormGroup;
  public codepoints$: Observable<string[]>;

  constructor(
    private readonly query: IconQuery,
    private readonly service: IconService,
    private readonly alert: AlertService,
    private readonly formsManager: NgFormsManager<SettingsForms>,
    private readonly formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.icons$ = this.query.icons$;
    this.newIconForm = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.compose([Validators.required, this.iconValidator()])],
    });
    this.formsManager.upsert('iconForm', this.newIconForm);
    const codePointsFuse$ = this.service.codepoints$.pipe(map((points) => ({ points, fuse: new Fuse(points) })));
    this.codepoints$ = combineLatest([codePointsFuse$, this.formsManager.valueChanges('iconForm', 'icon').pipe(startWith(''))]).pipe(
      map(([{ points, fuse }, search]) => (search ? fuse.search(search).map((i) => i.item) : points)),
      map((points) => points.slice(0, 10)),
    );
  }

  private iconValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control?.value) {
        return null;
      } else {
        return this.isValidIcon(control.value) ? null : { icon: true };
      }
    };
  }

  public isValidIcon(icon: string) {
    return this.service.codepoints.includes(icon);
  }

  public addIcon() {
    const { icon, name } = this.newIconForm.value;
    if (!this.isValidIcon(icon)) {
      this.alert.messageDialog('Icon Error', `${icon} is not a valid material icon`);
    } else {
      this.service.add({ icon, name });
      this.newIconForm.reset();
    }
  }

  public deleteIcon(icon: Icon) {
    this.service.remove(icon.id);
  }
}
