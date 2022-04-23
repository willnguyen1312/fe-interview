import React from "react";

export default function AppTagsInput() {
  const [value, setValue] = React.useState([]);

  return <TagsInput value={value} onChange={setValue} />;
}

export function TagsInput({ value = [], onChange = () => {} }) {
  const [inputValue, setInputValue] = React.useState("");
  const wrapperRef = React.useRef(null);
  const inputRef = React.useRef(null);

  function handleOnKeyDown(event) {
    const { key } = event;
    const isEnter = key === "Enter";
    const finalValue = inputValue.trim();

    if (isEnter && finalValue) {
      const newTags = [...new Set(value.concat(inputValue))];
      onChange(newTags);
      setInputValue("");

      return;
    }

    const isDelete = key === "Backspace";
    if (isDelete && !finalValue && value.length > 0) {
      const newTags = value.slice(0, -1);
      onChange(newTags);
    }
  }

  function handleOnWrapperClick(event) {
    if (event.target === wrapperRef.current) {
      inputRef.current.focus();
    }
  }

  function handleOnChange(event) {
    setInputValue(event.target.value);
  }

  function removeTag(tag) {
    const newTags = value.filter((t) => t !== tag);
    onChange(newTags);
  }

  function makeOnDeleteTagHandler(tag) {
    return () => removeTag(tag);
  }

  function makeTagONKeyDownHandler(tag) {
    return (event) => {
      const isEnter = event.key === "Enter";
      if (isEnter) {
        removeTag(tag);
      }
    };
  }

  return (
    <div
      onClick={handleOnWrapperClick}
      ref={wrapperRef}
      style={{
        padding: 12,
        border: "1px solid violet",
        borderRadius: 4,
        cursor: "text",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {value.map((tag) => {
        return (
          <span
            style={{
              padding: "4px 8px",
              margin: "2px",
              marginRight: 8,
              border: "1px solid blue",
              borderRadius: 2,
              maxWidth: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
            key={tag}
          >
            {tag}

            <span
              role="button"
              tabIndex={0}
              aria-label="Delete tag"
              onClick={makeOnDeleteTagHandler(tag)}
              onKeyDown={makeTagONKeyDownHandler(tag)}
              style={{
                marginLeft: 16,
                cursor: "pointer",
              }}
            >
              x
            </span>
          </span>
        );
      })}
      <input
        ref={inputRef}
        style={{
          width: 100,
          border: 0,
          outline: "none",
        }}
        value={inputValue}
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        data-testid="tags-input-testid"
      />
    </div>
  );
}
