import React from "react";
import { screen, render, fireEvent, within } from "@testing-library/react";
import { TagsInput } from "./TagsInput";
import userEvent, { specialChars } from "@testing-library/user-event";

function TestTagsInput({ initialTags = [] }) {
  const [value, setValue] = React.useState(initialTags);

  return <TagsInput value={value} onChange={setValue} />;
}

describe("TagsInput component", () => {
  function renderTagsInput(props = {}) {
    return render(<TestTagsInput {...props} />);
  }

  it("should handle add new input by ENTER key properly", async () => {
    renderTagsInput();

    // Type new tag
    const newTag = "abc";
    const input = screen.getByRole("textbox");
    await userEvent.type(input, newTag);
    // Hit Enter
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input.value).toBe("");
    expect(screen.getByText(newTag)).toBeInTheDocument();

    // Should prevent duplicated tag
    await userEvent.type(input, newTag);
    // Hit Enter
    fireEvent.keyDown(input, { key: "Enter" });
    expect(input.value).toBe("");
    expect(screen.queryAllByText(newTag)).toHaveLength(1);

    // Should add new tag when hit Enter
    const latestTag = "def";
    await userEvent.type(input, latestTag);
    // Hit Enter
    fireEvent.keyDown(input, { key: "Enter" });
    expect(input.value).toBe("");
    expect(screen.getByText(latestTag)).toBeInTheDocument();
  });

  it("should handle remove tag by DELETE key properly", () => {
    const initialTags = ["first", "second"];
    renderTagsInput({ initialTags });

    for (const tag of initialTags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }

    const input = screen.getByRole("textbox");
    // Hit Delete to clear right most tag
    fireEvent.keyDown(input, { key: "Backspace" });

    expect(screen.queryByText(initialTags[1])).not.toBeInTheDocument();
    expect(screen.getByText(initialTags[0])).toBeInTheDocument();

    // Hit Delete agin to clear last tag
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(screen.queryByText(initialTags[0])).not.toBeInTheDocument();
  });

  it("should handle remove tag by x button properly", async () => {
    const initialTags = ["first", "second", "third", "fourth"];
    renderTagsInput({ initialTags });

    // Remove first tag
    const firstTag = screen.getByText(initialTags[0]);
    const firstTagDeleteButton = within(firstTag).getByLabelText(/delete tag/i);

    await userEvent.click(firstTagDeleteButton);
    expect(screen.queryByText(initialTags[0])).not.toBeInTheDocument();

    // Assure the rest of tags should remain intact
    for (const tag of initialTags.slice(1)) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it("should handle keyboard usage properly", async () => {
    const initialTags = ["first", "second"];
    renderTagsInput({ initialTags });

    screen.logTestingPlaygroundURL();

    const firstTag = screen.getByText(initialTags[0]);
    const firstTagDeleteButton = within(firstTag).getByLabelText(/delete tag/i);

    const secondTag = screen.getByText(initialTags[1]);
    const secondTagDeleteButton =
      within(secondTag).getByLabelText(/delete tag/i);

    firstTagDeleteButton.focus();

    userEvent.tab();

    // Hit Tab to move to second tag
    expect(secondTagDeleteButton).toHaveFocus();
    // Hit Enter
    fireEvent.keyDown(secondTagDeleteButton, { key: "Enter" });
    // Should delete second tag
    expect(screen.queryByText(initialTags[1])).not.toBeInTheDocument();
    // Should remain first tag
    expect(screen.getByText(initialTags[0])).toBeInTheDocument();
  });
});
