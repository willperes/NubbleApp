import React from "react";

import { fireEvent, render, screen } from "test-utils";

import { IconProps, PasswordInput } from "@components";

describe("<PasswordInput />", () => {
  it("should start with secure text entry enabled", () => {
    render(<PasswordInput label={"Senha"} placeholder={"Digite sua senha"} />);

    const inputElement = screen.getByPlaceholderText("Digite sua senha");
    expect(inputElement.props.secureTextEntry).toBe(true);
  });

  it("should toggle the secure text entry when the eye icon is pressed", () => {
    render(<PasswordInput label={"Senha"} placeholder={"Digite sua senha"} />);

    const eyeOnIcon: IconProps["name"] = "eyeOn";
    fireEvent.press(screen.getByTestId(eyeOnIcon));

    const eyeOffIcon: IconProps["name"] = "eyeOff";
    expect(screen.getByTestId(eyeOffIcon)).toBeTruthy();
  });
});
