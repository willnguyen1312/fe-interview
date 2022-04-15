import React from "react";

import { formatDate } from "../utils";

export function Project({
  name,
  template,
  target,
  createdByUser,
  createdDate,
}) {
  return (
    <div
      style={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        border: "1px solid #ccc",
        marginTop: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>{name}</p>
        <p>{template}</p>
      </div>

      <p>Target: {target}</p>

      <hr
        style={{
          width: "100%",
          height: 0.5,
          background: "aqua",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <p>
          CREATED: {createdByUser} &bull; {formatDate(createdDate)}
        </p>
      </div>
    </div>
  );
}
