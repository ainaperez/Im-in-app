export interface Event {
  _id: string,
  owner: string,
  title: string,
  description: string,
  date: Date,
  location: string,
  coordinates: [number, number],
  image?: string,
  limitAttendees?: number,
  invitees: string[],
  hideFrom: string[],
  joined: string[],
  announcements: string[],
  cancelled: boolean,
  active: boolean,
  __v?: number,
  liked?: boolean
}