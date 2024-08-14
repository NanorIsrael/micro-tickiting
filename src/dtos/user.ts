import { UserI } from "../models/User";

export interface UserDoc {
  $isNew: boolean;
  _doc: UserI;
}
