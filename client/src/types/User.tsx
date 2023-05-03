export interface User {
  _id? : {
    $oid: string
  },
  name: string,
  profilePicture: string,
  phone: string,
  email: string,
  age: number,
  friends: string[],
  following: string[],
  savedEvents: string[],
  joinedEvents: string[],
  username: string,
  salt?: string,
  hash?: string,
  __v?: number,
  password?: string
}