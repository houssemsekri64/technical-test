import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
    usePathname: () => "/",
    useSearchParams: () => [new URLSearchParams(), jest.fn()],
  }),
}));
jest.mock("axios", () => ({
  // Mock the post method and return a success response
  post: jest.fn(() => Promise.resolve({ data: { success: true } })),
}));

import LoginForm from "@/src/app/page";

describe("LoginForm", () => {
  it("should render the form with inputs and buttons", () => {
    // Expect the elements to be in the document
    render(<LoginForm />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Remember me")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("should validate the inputs and show errors if they are empty", async () => {
    // Render the component
    render(<LoginForm />);

    // Find the elements by their data-testid attributes
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Sign in" });

    // Click the login button without filling the inputs
    fireEvent.click(loginButton);

    // Expect to see error messages for both inputs
    expect(
      await screen.findByText("Username is required.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Password is required.")
    ).toBeInTheDocument();
  });

  it("should show an error message if the request fails", async () => {
    // Import axios after mocking it
    const axios = require("axios");

    // Spy on the post method and mock an error response
    jest.spyOn(axios, "post").mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });

    // Render the component
    render(<LoginForm />);

    // Find the elements by their data-testid attributes
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const rememberMeCheckbox = screen.getByLabelText("Remember me");
    const loginButton = screen.getByRole("button", { name: "Sign in" });

    // Fill the inputs with valid values
    fireEvent.change(usernameInput, { target: { value: "user1" } });
    fireEvent.change(passwordInput, { target: { value: "123456789" } });
    fireEvent.click(rememberMeCheckbox);

    // Click the login button
    fireEvent.click(loginButton);

    // Expect to see an error message
    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });
});
