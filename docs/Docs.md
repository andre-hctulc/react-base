# react-base

## Map inputs

`InputMap<T>` edits a `Record<string, T>` with built-in key inputs and add/remove
controls. Use `defaultValue` for uncontrolled state or `value` and
`onChange={({ value }) => ...}` for controlled state.

- `renderInput` renders only a value input, for both the new entry and existing
  entries. It receives `key`, `candidate` (whether this is the new entry), and
  `inputProps` containing `value`, `name`, `onChange({ value })`, and field flags.
- Existing entries receive a dot-separated name: `${name}.${key}`. Draft value
  inputs have no name, so they are not submitted before being added.
- Duplicate keys are blocked and show a validation message.
- `readOnly` hides entry creation and blocks changes; `disabled` blocks changes
  without hiding the entry input. `reverse` places the entry input after the values.
- The root supports standard div props, a ref, and the existing `render` prop.

`TextInputMap` provides a ready-to-use string map editor:

```tsx
import { TextInputMap } from "@/components/text-input-map";

<TextInputMap
    name="settings"
    defaultValue={{ language: "en" }}
    onChange={({ value }) => console.log(value)}
    keyPlaceholder="Setting"
    placeholder="Value"
/>;
```

Existing values can be edited; existing keys are read-only. Remove and re-add an
entry to rename its key. New entries require a nonempty, unused key and a supplied
value. Named entries use dot notation, such as `settings.language`.

Use `textarea` for multiline values. Enter adds an entry in single-line inputs;
Ctrl/Cmd+Enter adds from a textarea, while plain Enter inserts a newline.
`keyInputProps` customizes the new key input, `inputProps` customizes the new value
input, and `listInputProps` customizes existing value inputs.