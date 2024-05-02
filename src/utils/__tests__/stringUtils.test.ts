import { stringUtils } from "../stringUtils";

describe("stringUtils", () => {
  describe("capitalizeFirstLetter", () => {
    it("should capitalize the first letter of each word", () => {
      expect(stringUtils.capitalizeFirstLetter("Willian peres")).toBe(
        "Willian Peres",
      );
      expect(stringUtils.capitalizeFirstLetter("WILLIAN PERES")).toBe(
        "Willian Peres",
      );
      expect(stringUtils.capitalizeFirstLetter("willian Peres")).toBe(
        "Willian Peres",
      );
      expect(stringUtils.capitalizeFirstLetter("willian peres")).toBe(
        "Willian Peres",
      );
      expect(stringUtils.capitalizeFirstLetter("willian")).toBe("Willian");
    });

    it("should trim the words", () => {
      expect(stringUtils.capitalizeFirstLetter(" willian peres")).toBe(
        "Willian Peres",
      );
      expect(stringUtils.capitalizeFirstLetter("willian peres ")).toBe(
        "Willian Peres",
      );
      expect(stringUtils.capitalizeFirstLetter(" willian peres ")).toBe(
        "Willian Peres",
      );
    });
  });
});
