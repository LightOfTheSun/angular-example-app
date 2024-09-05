export interface IRegisterModel {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  acceptTerms: boolean;
}
