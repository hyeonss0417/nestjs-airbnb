import { Room } from '../../rooms/entities/room.entity';
import { CountryName } from '../entities/country.entity';

interface TaxStrategy {
  calculateTax: (
    room: Room,
    stayDays: number,
  ) => { percent: number; amount: number };
}

export const taxStrategies: Record<CountryName, TaxStrategy> = {
  SouthKorea: {
    calculateTax: (room, stayDays) => ({ percent: 10, amount: 0 }),
  },
  Japan: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  Bermuda: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  Brazil: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  BritishVirginIslands: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  Canada: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  France: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  Germany: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  India: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  Italy: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  Lithuania: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  Mexico: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  Netherlands: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  Portugal: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
  Switzerland: {
    calculateTax: (room, stayDays) => ({ percent: 5, amount: 0 }),
  },
};
