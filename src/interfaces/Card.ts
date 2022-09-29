export interface Card {
    _id?: string;
    userId: string;
    name: string;
    address: string;
    description: string;
    phone: string;
    image: string;
    cardNumber?: number;
  }  