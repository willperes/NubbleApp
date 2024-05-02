import { formatISO, sub } from "date-fns";

import { dateUtils } from "../dateUtils";

// 1st December 2023 (01/12/2023) 12:00:00 UTC
const MOCKED_DATE_NOW = 1701432000000;

describe("dateUtils", () => {
  beforeAll(() => {
    jest.spyOn(Date, "now").mockImplementation(() => MOCKED_DATE_NOW);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("formatRelative", () => {
    it("should be displayed in seconds if the difference is less than 1 minute", () => {
      const time = sub(Date.now(), { seconds: 59 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toEqual("59 s");
    });

    it("should be displayed in minutes if the difference is less than 1 hour", () => {
      const time = sub(Date.now(), { minutes: 59 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toEqual("59 m");
    });

    it("should be displayed in hours if the difference is less than 24 hours", () => {
      const time = sub(Date.now(), { hours: 23 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toEqual("23 h");
    });

    it("should be displayed in days if the difference is less than 7 days", () => {
      const time = sub(Date.now(), { days: 6 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toEqual("6 d");
    });

    it("should be displayed in weeks if the difference is less than or equal to 4 weeks", () => {
      const time = sub(Date.now(), { weeks: 3 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toEqual("3 sem");
    });

    it("should be displayed in months if the difference is less than 12 months", () => {
      const time = sub(Date.now(), { months: 11 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toEqual("11 mes");
    });

    it("should display as dd/MM/yyyy if the difference is higher than 12 months", () => {
      const time = sub(Date.now(), { months: 12 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toEqual("01/12/2022");
    });
  });
});
