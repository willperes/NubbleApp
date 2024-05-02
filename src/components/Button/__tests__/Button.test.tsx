import React from "react";

import { fireEvent, render, screen } from "test-utils";

import { Button } from "../Button";

describe("<Button />", () => {
  it("should display the title", () => {
    render(<Button title={"Title"} />);

    const textElement = screen.getByText("Title");
    expect(textElement).toBeTruthy();
  });

  it("should call the onPress function when it has been pressed", () => {
    const mockedOnPress = jest.fn();

    render(<Button title={"Title"} onPress={mockedOnPress} />);

    const element = screen.getByTestId("button");
    fireEvent.press(element);

    expect(mockedOnPress).toHaveBeenCalled();
  });

  it("should not call the onPress function when it has been pressed and it is disabled", () => {
    const mockedOnPress = jest.fn();

    render(<Button title={"Title"} onPress={mockedOnPress} disabled />);

    const element = screen.getByTestId("button");
    fireEvent.press(element);

    expect(mockedOnPress).not.toHaveBeenCalled();
  });

  describe("when the button is loading", () => {
    it("should show the loading indicator", () => {
      render(<Button title={"Title"} loading />);

      const loadingElement = screen.getByTestId("loading-activity-indicator");
      expect(loadingElement).toBeTruthy();
    });

    it("should hide the title", () => {
      render(<Button title={"Title"} loading />);

      const titleElement = screen.queryByText("Title");
      expect(titleElement).not.toBeTruthy();
    });

    it("should disable the onPress function", () => {
      const mockedOnPress = jest.fn();
      render(<Button title={"Title"} loading onPress={mockedOnPress} />);

      const buttonElement = screen.getByTestId("button");
      fireEvent.press(buttonElement);

      expect(mockedOnPress).not.toHaveBeenCalled();
    });
  });
});
