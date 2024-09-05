import { FormControl } from '@angular/forms';

export type TFormControl<T> = {
  [P in keyof T]: FormControl<T[P]>;
};
