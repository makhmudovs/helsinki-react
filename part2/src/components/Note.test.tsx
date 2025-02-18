import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";

test("renders contend", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
    id: "vnba2781727811-29879",
  };
  const toggleImportance = (id: string) => {
    return id;
  };

  render(<Note toggleImportance={toggleImportance} note={note} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );

  screen.debug(element);

  expect(element).toBeDefined();
});

test("clicking the button calls the event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
    id: "vnba2781727811-29879",
  };

  const mockHandler = vi.fn();

  render(<Note toggleImportance={mockHandler} note={note} />);

  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
