import { Component, input, model } from '@angular/core';
import { generateRandomString } from '../../utils/helper.utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch-checkbox',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './switch-checkbox.component.html'
})
export class SwitchCheckboxComponent {
  id = input<string>(generateRandomString());
  bottomMargin = input<number>(2);
  value = model<boolean>(false);
}
