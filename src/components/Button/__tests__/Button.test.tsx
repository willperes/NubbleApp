import React from "react";

import { fireEvent, render, screen } from "test-utils";

import { Button } from "../Button";

describe("<Button />", () => {
  it("should call the onPress function when it has been pressed", () => {
    const mockedOnPress = jest.fn();

    render(<Button title={"Title"} onPress={mockedOnPress} />);

    const element = screen.getByText("Title");
    fireEvent.press(element);

    expect(mockedOnPress).toHaveBeenCalled();
  });

  it("should not call the onPress function when it has been pressed and it is disabled", () => {
    const mockedOnPress = jest.fn();

    render(<Button title={"Title"} onPress={mockedOnPress} disabled />);

    const element = screen.getByText("Title");
    fireEvent.press(element);

    expect(mockedOnPress).not.toHaveBeenCalled();
  });
});
