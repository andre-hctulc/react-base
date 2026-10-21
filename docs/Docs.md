# react-base

## List inputs

`InputList<T>` owns item rows and add/remove controls, just as `InputMap` does.
`renderInput` renders only the value input and receives `index`, `candidate`
(whether this is the new-item input), and `inputProps`. Spread the field props
onto your input and adapt its change event to `onChange({ value })`.

This replaces the previous `renderValues` callback and renderer-owned controls.
`TextInputList` supplies text inputs or textareas through this same callback;
`inputProps` customizes its draft input and `listInputProps` customizes existing
inputs.

Use `defaultValue` for uncontrolled state or `value` with `onChange` for controlled
state. Every add, edit, and removal notifies `onChange({ value })`. Removing an item
uses its index, so equal values can be removed individually. Existing inputs retain
the supplied `name`; the draft is unnamed and excluded from form submission.

The new-item input appears first by default; `reverse` places it last. `readOnly`
hides add/remove controls and blocks changes; `disabled` disables controls and
blocks changes. Enter adds an item; in textareas, Ctrl/Cmd+Enter adds an item and
plain Enter inserts a newline. An undefined draft cannot be added; other values,
including `0`, `false`, and empty strings, are valid candidates.

`unique` replaces matching entries when adding, using `compareValues` (strict
equality by default). `sort` sorts displayed items without mutating supplied arrays
and sorts the emitted list when adding.

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