import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GreetForm } from "./greet-form";

describe("GreetForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input field and submit button", () => {
    render(<GreetForm />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get greeting/i })).toBeInTheDocument();
  });

  it("fetches and displays greeting message on button click", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Hello, Alice!" }),
    } as Response);

    render(<GreetForm />);

    const input = screen.getByLabelText(/your name/i);
    const button = screen.getByRole("button", { name: /get greeting/i });

    fireEvent.change(input, { target: { value: "Alice" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/greet?name=Alice");
      expect(screen.getByTestId("greet-result")).toHaveTextContent("Hello, Alice!");
    });
  });
});