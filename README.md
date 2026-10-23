# react-base

## Input lists and maps

`InputList` and `InputMap` render the new-entry inputs after existing items by
default. This also applies to `TextInputList` and `TextInputMap`. Set
`reverse={false}` to keep the new-entry inputs above existing items.

## JSON form

`JsonForm` renders JSON Schema forms with RJSF and AJV. Use `defaultValue` for
initial data, or `value` and `onChange` for controlled data. Set `submitButton` to
show the built-in submit button; custom children replace that button.

Schemas with `additionalProperties` support adding, renaming (on blur), and
removing keys. Array controls and property-key inputs respect `readOnly` and
`disabled`. Field help is configured through `ui:help`; absent or whitespace-only
help is not rendered.
Declared and additional object properties use the same vertical spacing as
array items, including inside nested objects.
Add-property and add-item controls appear below their properties or items,
using the normal field gap without extra button margins.
Icon-only action buttons and array item menu triggers show tooltips describing
their actions.

Run `pnpm storybook` and open **Components / JsonForm** for dedicated examples and
interaction checks. Run the focused browser regression suite with:

```sh
pnpm exec vitest run stories/json-form.stories.tsx stories/forms.stories.tsx
```
