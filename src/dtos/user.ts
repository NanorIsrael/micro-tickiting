export interface UserI {
  _id: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  friends: Array<string>;
  occupation: string;
  location: string;
  photo: string;
}
export interface UserDoc {
  $isNew: boolean;
  _doc: UserI;
}
