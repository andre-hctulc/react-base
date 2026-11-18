import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../src/components/ui/input.js";
import { InputList } from "../src/components/input-list.js";

const meta = { title: "Components/InputList" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const InputListExample: FC = () => {
    return (
        <InputList
            defaultValue={["platform@example.com"]}
            unique
            className="max-w-md space-y-3"
            renderInput={({ inputProps: { onChange, ...inputProps } }) => (
                <Input
                    {...inputProps}
                    value={inputProps.value ?? ""}
                    onChange={(event) => onChange({ value: event.target.value })}
                    placeholder="Add email"
                />
            )}
        />
    );
};

export const Default: Story = { render: () => <InputListExample /> };
