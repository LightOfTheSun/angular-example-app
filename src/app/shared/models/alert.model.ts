export interface IAlertModel {
  id?: number;
  msg: string;
  classname?: string;
  autohide?: boolean;
  delay?: number;
  type?: 'success' | 'error';
}
