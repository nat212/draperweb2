import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { preventEventBubble } from '@helpers/prevent-bubble.helper';
import { CategoryModel } from '@modules/budgets/state/category/category.model';
import { CategoryQuery } from '@modules/budgets/state/category/category.query';
import { CategoryService } from '@modules/budgets/state/category/category.service';
import { AlertService } from '@services/alert.service';
import { Observable } from 'rxjs';
import { Icon } from 'src/app/state/icon/icon.model';
import { IconQuery } from 'src/app/state/icon/icon.query';

@Component({
  selector: 'dw-category-settings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.scss'],
})
export class CategorySettingsComponent implements OnInit {
  public categories$: Observable<CategoryModel[]>;
  public icons$: Observable<Icon[]>;
  public categoryForm: FormGroup;

  constructor(
    private readonly query: CategoryQuery,
    private readonly service: CategoryService,
    private readonly icon: IconQuery,
    private readonly formBuilder: FormBuilder,
    private readonly alert: AlertService,
  ) {}

  public ngOnInit(): void {
    this.icons$ = this.icon.icons$;
    this.categories$ = this.query.models$;
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  public addCategory(): void {
    const { icon, name }: { icon: Icon; name: string } = this.categoryForm.value;
    this.service.add({ name, iconId: icon.id });
  }

  public deleteCategory(category: CategoryModel, event: MouseEvent) {
    preventEventBubble(event);
    this.alert
      .messageDialog('Delete Category', `Are you sure you wish to delete ${category.name}? This operation cannot be undone`, true)
      .subscribe((result) => {
        if (result) {
          this.service.remove(category.id);
        }
      });
  }
}
