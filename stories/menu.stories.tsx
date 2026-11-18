import type { Meta, StoryObj } from "@storybook/react-vite";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { useState } from "react";
import {
    Menu, MenuGroup, MenuItem, MenuLabel, MenuLink, MenuSeparator, MenuShortcut,
    SubmenuRoot, SubmenuTrigger, SubmenuContent,
} from "../src/components/menu.js";

const meta = { title: "Components/Menu" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const InlineMenu: Story = {
    render: () => (
        <Menu aria-label="Document actions" className="w-56 border">
            <MenuGroup aria-labelledby="document-menu-label">
                <MenuLabel id="document-menu-label">Document</MenuLabel>
                <MenuItem onClick={() => window.alert("Saved")}>
                    Save <MenuShortcut>⌘S</MenuShortcut>
                </MenuItem>
                <MenuLink href="#details">Details</MenuLink>
                <MenuItem disabled>Move</MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <SubmenuRoot>
                <SubmenuTrigger>Share</SubmenuTrigger>
                <SubmenuContent>
                    <MenuItem onClick={() => window.alert("Link copied")}>Copy link</MenuItem>
                    <MenuLink href="#email">Email</MenuLink>
                    <SubmenuRoot>
                        <SubmenuTrigger>More options</SubmenuTrigger>
                        <SubmenuContent>
                            <MenuItem onClick={() => window.alert("Exported")}>Export</MenuItem>
                        </SubmenuContent>
                    </SubmenuRoot>
                </SubmenuContent>
            </SubmenuRoot>
            <MenuSeparator />
            <MenuItem variant="destructive" onClick={() => window.alert("Deleted")}>
                Delete
            </MenuItem>
        </Menu>
    ),
}; 

function ControlledSubmenuExample() {
    const [open, setOpen] = useState(true);
    return (
        <Menu aria-label="Controlled menu" className="w-56 border">
            <SubmenuRoot open={open} onOpenChange={setOpen}>
                <SubmenuTrigger>Settings</SubmenuTrigger>
                <SubmenuContent>
                    <MenuItem>Preferences</MenuItem>
                </SubmenuContent>
            </SubmenuRoot>
            <SubmenuRoot disabled>
                <SubmenuTrigger>Unavailable</SubmenuTrigger>
                <SubmenuContent>
                    <MenuItem>Hidden action</MenuItem>
                </SubmenuContent>
            </SubmenuRoot>
        </Menu>
    );
}

export const ControlledSubmenus: Story = {
    render: () => <ControlledSubmenuExample />,
};

export const RightToLeft: Story = {
    render: () => (
        <DirectionProvider direction="rtl">
            <Menu dir="rtl" aria-label="Right-to-left menu" className="w-56 border">
                <SubmenuRoot>
                    <SubmenuTrigger>Options</SubmenuTrigger>
                    <SubmenuContent>
                        <MenuItem>Action</MenuItem>
                    </SubmenuContent>
                </SubmenuRoot>
            </Menu>
        </DirectionProvider>
    ),
};
