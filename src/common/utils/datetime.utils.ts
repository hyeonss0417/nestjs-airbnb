export const DateDiff = {
  inDays: function(d1: Date, d2: Date) {
    const t2 = d2.getTime();
    const t1 = d1.getTime();

    return Math.trunc((t2 - t1) / (24 * 3600 * 1000));
  },

  inWeeks: function(d1: Date, d2: Date) {
    const t2 = d2.getTime();
    const t1 = d1.getTime();

    return Math.trunc((t2 - t1) / (24 * 3600 * 1000 * 7));
  },

  inMonths: function(d1: Date, d2: Date) {
    const d1Y = d1.getFullYear();
    const d2Y = d2.getFullYear();
    const d1M = d1.getMonth();
    const d2M = d2.getMonth();

    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  },

  inYears: function(d1: Date, d2: Date) {
    return d2.getFullYear() - d1.getFullYear();
  },
};

export class DateRange {
  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
  startDate: Date;
  endDate: Date;

  intersect(other: DateRange): boolean {
    if (
      this.startDate.getTime() <= other.endDate.getTime() &&
      other.endDate.getTime() <= this.endDate.getTime()
    )
      return true;
    if (
      this.startDate.getTime() <= other.startDate.getTime() &&
      other.startDate.getTime() <= this.endDate.getTime()
    )
      return true;

    if (
      other.startDate.getTime() <= this.startDate.getTime() &&
      this.endDate.getTime() <= other.endDate.getTime()
    )
      return true;

    return false;
  }
}
