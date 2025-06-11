export interface DbUser {
  _id?: string;
  name: string;
  email: string;
  pictureUrl: string;
  credits: number;
  _creationTime?: Date;
}

export interface AuthContextType {
  user: DbUser | null;
}