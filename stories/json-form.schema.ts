import type { JsonFormProps } from "../src/components/json-form.js";

export const workspaceProfileSchema: JsonFormProps["schema"] = {
    type: "object",
    title: "Workspace profile",
    required: ["workspaceName"],
    properties: {
        workspaceName: {
            type: "string",
            title: "Workspace name",
        },
        owner: {
            type: "object",
            title: "Owner",
            properties: {
                name: {
                    type: "string",
                    title: "Full name",
                },
                email: {
                    type: "string",
                    title: "Email",
                    format: "email",
                },
                address: {
                    type: "object",
                    title: "Address",
                    properties: {
                        street: {
                            type: "string",
                            title: "Street",
                        },
                        city: {
                            type: "string",
                            title: "City",
                        },
                        postalCode: {
                            type: "string",
                            title: "Postal Code",
                        },
                    },
                },
            },
        },
        office: {
            type: "object",
            title: "Office address",
            properties: {
                city: {
                    type: "string",
                    title: "City",
                },
                country: {
                    type: "string",
                    title: "Country",
                },
            },
        },
        teamMembers: {
            type: "array",
            title: "Team members",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        title: "Name",
                    },
                    email: {
                        type: "string",
                        title: "Email",
                        format: "email",
                    },
                },
            },
        },
        notificationsEnabled: {
            type: "boolean",
            title: "Enable email notifications",
        },
    },
};
