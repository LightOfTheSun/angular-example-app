import { Component, input, model, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input.component.html'
})
export class InputComponent implements OnChanges {
  value = model.required<string>();
  typeOfInput = input<'text' | 'number'>('text');
  showInput = input<boolean>(true);
  fillColor = input<string>('#f0ff9f');
  placeholder = input<string>('...');
  disabled = input<boolean>(false);
  inputClass = input<string>('text-12 mb-2');

  valueChange = output<string>();
  valueChangedNumber = output<number | undefined>();

  readonly lastValue = signal('');

  selectValue(value: string) {
    if (this.typeOfInput() === 'number')
      this.valueChangedNumber.emit(value === '' ? undefined : Number(value));
    else
      this.valueChange.emit(value);
    this.lastValue.set(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && changes['value'].currentValue !== this.lastValue())
      this.lastValue.set(changes['value'].currentValue);
  }
}
