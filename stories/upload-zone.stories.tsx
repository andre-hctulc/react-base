import type { Meta, StoryObj } from "@storybook/react-vite";
import { UploadZone } from "../src/components/upload-zone.js";

const meta = { title: "Components/UploadZone" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const FileUpload: Story = {
    render: () => (
        <UploadZone
            className="max-w-lg"
            accept=".json,.yaml"
            text="Upload configuration"
            secondaryText="Drop a JSON or YAML file here"
            renderFiles={(files) => (
                <p className="mt-3 text-sm text-muted-foreground">{files.length} file(s) selected</p>
            )}
        />
    ),
};
