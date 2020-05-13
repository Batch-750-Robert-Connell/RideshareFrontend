import { User } from './user';

export class Reservation {
  /**
   * Set Reservation model
   */
  reservationId: number;
  /**
   * Set date
   */
  travelDate: string;
  /**
   * Set Driver User
   */
  driver: User = new User();
  /**
   * Set rider User
   */
  rider: User = new User();
  /**
   * Set status
   */
  status: number;
}
