import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    CurrentWizardFormData,
    WizardForm,
    WizardFormBackButton,
    WizardFormDescription,
    WizardFormFooter,
    WizardFormProgress,
    WizardFormStep,
    WizardFormSubmitButton,
    WizardFormSub,
    WizardFormTitle,
    WizardFormContent,
} from "../src/components/wizard-form.js";
import { Input } from "../src/components/ui/input.js";
import { cloneElement } from "react";
import { LabeledSeparator } from "@/components/labeled-separator.js";

const meta = { title: "Components/WizardForm" } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const baseForm = (
            <WizardForm
                className="w-full max-w-xl"
                onComplete={(data, mergedData) => alert(JSON.stringify({ data, mergedData }))}
            >
                <WizardFormProgress />
                <CurrentWizardFormData className="mt-4" />
                <WizardFormContent>
                    <WizardFormStep>
                        <WizardFormTitle>Workspace</WizardFormTitle>
                        <WizardFormDescription>Choose a name for this workspace.</WizardFormDescription>
                        <WizardFormSub>
                            <form className="mt-4">
                                <Input name="workspace" required defaultValue="FDC Platform" />
                            </form>
                        </WizardFormSub>
                    </WizardFormStep>
                    <WizardFormStep collapsible>
                        <WizardFormTitle>Owner</WizardFormTitle>
                        <WizardFormDescription>Confirm the owner email address.</WizardFormDescription>
                        <WizardFormSub>
                            <form className="mt-4">
                                <Input name="email" type="email" required defaultValue="owner@example.com" />
                            </form>
                        </WizardFormSub>
                    </WizardFormStep>
                </WizardFormContent>
                <WizardFormFooter>
                    <WizardFormBackButton />
                    <WizardFormSubmitButton />
                </WizardFormFooter>
            </WizardForm>
        );
        return (
            <div className="space-y-10 flex flex-col items-center">
                {baseForm}
                <LabeledSeparator className="w-full">Stacked</LabeledSeparator>
                {cloneElement(baseForm, { variant: "stacked" })}
            </div>
        );
    },
};
