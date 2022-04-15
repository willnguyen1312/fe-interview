import React from "react";

export default function AppTagsInput() {
  const [value, setValue] = React.useState([]);

  return (
    <div>
      <TagsInput value={value} onChange={setValue} />
    </div>
  );
}

export function TagsInput({ value = [], onChange }) {
  const [inputValue, setInputValue] = React.useState("");
  const wrapperRef = React.useRef(null);
  const inputRef = React.useRef(null);

  function handleOnKeyDown(event) {
    const { keyCode } = event;
    const isEnter = keyCode === 13;

    if (isEnter && inputValue) {
      const newTags = [...new Set(value.concat(inputValue))];

      onChange && onChange(newTags);

      setInputValue("");
      return;
    }

    const isDelete = keyCode === 8;

    if (isDelete && !inputValue && value.length) {
      const newTags = value.slice(0, value.length - 1);
      onChange && onChange(newTags);
      return;
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
    onChange && onChange(newTags);
  }

  function makeOnDeleteTagHandler(tag) {
    return () => {
      removeTag(tag);
    };
  }

  function makeTagONKeyDownHandler(tag) {
    return (event) => {
      const isEnter = event.keyCode === 13;
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
      }}
    >
      {value.map((tag) => {
        return (
          <span
            style={{
              padding: "4px 8px",
              marginRight: 8,
              border: "1px solid green",
              position: "relative",
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
        }}
        value={inputValue}
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        data-testid="tags-input-testid"
      />
    </div>
  );
}
