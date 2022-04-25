import React from "react";
import { screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TagsInput } from "./TagsInput";
import { checkAccessibility } from "../testUtils";

function TestTagsInput({ initialTags = [] }) {
  const [value, setValue] = React.useState(initialTags);

  return <TagsInput value={value} onChange={setValue} />;
}

describe("TagsInput component", () => {
  function setup(props = {}) {
    return {
      user: userEvent.setup(),
      ...render(<TestTagsInput {...props} />),
    };
  }

  it("should handle add new input by ENTER key properly", async () => {
    const { user, container } = setup();
    await checkAccessibility(container);

    // Type new tag
    const newTag = "abc";
    const input = screen.getByRole("textbox");
    await user.type(input, newTag);
    // Hit Enter
    await user.keyboard("{Enter}");

    expect(input.value).toBe("");
    expect(screen.getByText(newTag)).toBeInTheDocument();

    // Should prevent duplicated tag
    await user.type(input, newTag);
    // Hit Enter
    await user.keyboard("{Enter}");
    expect(input.value).toBe("");
    expect(screen.queryAllByText(newTag)).toHaveLength(1);

    // Should add new tag when hit Enter
    const latestTag = "def";
    await user.type(input, latestTag);
    // Hit Enter
    await user.keyboard("{Enter}");
    expect(input.value).toBe("");
    expect(screen.getByText(latestTag)).toBeInTheDocument();
  });

  it("should handle remove tag by Backspace key properly", async () => {
    const initialTags = ["first", "second"];
    const { user, container } = setup({ initialTags });
    await checkAccessibility(container);

    for (const tag of initialTags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }

    const input = screen.getByRole("textbox");
    await user.click(input);
    expect(input).toHaveFocus();

    // // Hit Delete to clear right most tag
    await user.keyboard("{Backspace}");
    expect(screen.getByText(initialTags[0])).toBeInTheDocument();
    expect(screen.queryByText(initialTags[1])).not.toBeInTheDocument();

    // // Hit Delete agin to clear last tag
    await user.keyboard("{Backspace}");
    expect(screen.queryByText(initialTags[0])).not.toBeInTheDocument();
  });

  it("should handle remove tag by x button properly", async () => {
    const initialTags = ["first", "second", "third", "fourth"];
    const { user, container } = setup({ initialTags });
    await checkAccessibility(container);

    // Remove first tag
    const firstTag = screen.getByText(initialTags[0]);
    const firstTagDeleteButton = within(firstTag).getByRole("button", {
      name: /delete tag/i,
    });

    await user.click(firstTagDeleteButton);
    expect(screen.queryByText(initialTags[0])).not.toBeInTheDocument();

    // Assure the rest of tags should remain intact
    for (const tag of initialTags.slice(1)) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it("should handle keyboard usage properly", async () => {
    const initialTags = ["first", "second"];
    const { user, container } = setup({ initialTags });
    await checkAccessibility(container);

    const firstTag = screen.getByText(initialTags[0]);
    const firstTagDeleteButton = within(firstTag).getByRole("button", {
      name: /delete tag/i,
    });

    const secondTag = screen.getByText(initialTags[1]);
    const secondTagDeleteButton = within(secondTag).getByRole("button", {
      name: /delete tag/i,
    });

    firstTagDeleteButton.focus();

    await user.tab();

    // Hit Tab to move to second tag
    expect(secondTagDeleteButton).toHaveFocus();
    // Hit Enter
    await user.keyboard("{Enter}");
    // Should delete second tag
    expect(screen.queryByText(initialTags[1])).not.toBeInTheDocument();
    // Should remain first tag
    expect(screen.getByText(initialTags[0])).toBeInTheDocument();
  });
});
