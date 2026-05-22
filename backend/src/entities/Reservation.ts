export interface Reservation {
  id?: number;
  userId: number;
  reservationDate: string;
  guestCount: number;
  status: string;
}
