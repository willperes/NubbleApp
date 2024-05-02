import { formatISO, sub } from "date-fns";

import { dateUtils } from "../dateUtils";

const MOCKED_DATE_NOW = 1700000000000;

describe("dateUtils", () => {
  describe("formatRelative", () => {
    beforeAll(() => {
      jest.spyOn(Date, "now").mockImplementationOnce(() => MOCKED_DATE_NOW);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should display seconds if less than 1 minute ago", () => {
      // Get the date 30 seconds ago.
      const time = sub(Date.now(), { seconds: 30 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toEqual("30 s");
    });
  });
});
