export interface UserI {
  _id: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  friends: Array<string>;
  occupation: string;
  lacation: string;
  photo: string;
}
