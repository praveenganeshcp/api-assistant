import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { action } from "@storybook/addon-actions";

export default {
    component: Button,
    title: "React Easy/Button",
    parameters: {
        layout: 'centered',
        docs: {
            controls: {
                exclude: ['onClick']
            }
        }
    },
    argTypes: {
        size: {
            table: {
                defaultValue: { summary: 'medium' },
            },
            description: "Controls the size of button"
        },
        label: {
            table: {
                defaultValue: { summary: '' },
            },
            description: "Label text for the button"
        },
        group: {
            table: {
                defaultValue: { summary: 'primary' },
            },
            description: "Type of the button"
        },
    },
} as Meta;

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        group: "primary",
        size: "medium",
        label: "Click me",
        onClick: action("Clicked"),
    },
}

export const Secondary: Story = {
    args: {
        group: "secondary",
        label: "Click me",
        size: "medium",
        onClick: action("Clicked"),
    }
}

export const Text: Story = {
    args: {
        group: "text",
        label: "Click me",
        size: "medium",
        onClick: action("Clicked")
    }
}

