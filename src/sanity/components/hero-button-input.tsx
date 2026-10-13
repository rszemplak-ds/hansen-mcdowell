"use client";

import { unset, type ObjectInputProps } from "sanity";

/** Adds a reset control, since a chosen radio option can't otherwise be cleared. */
export function HeroButtonInput(props: ObjectInputProps) {
  const isCustomized = Boolean(props.value && Object.keys(props.value).some((key) => key !== "_type"));

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          fontSize: 13,
        }}
      >
        <span style={{ opacity: 0.75 }}>
          {isCustomized ? "Customized for this page." : "Using the site default."}
        </span>
        <button
          type="button"
          disabled={!isCustomized || props.readOnly}
          onClick={() => props.onChange(unset())}
          style={{
            padding: "6px 12px",
            borderRadius: 4,
            border: "1px solid currentColor",
            background: "transparent",
            color: "inherit",
            font: "inherit",
            cursor: isCustomized ? "pointer" : "default",
            opacity: isCustomized ? 1 : 0.4,
          }}
        >
          Reset to default
        </button>
      </div>
      {props.renderDefault(props)}
    </div>
  );
}
