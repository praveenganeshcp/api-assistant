import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { action } from "@storybook/addon-actions";

export default {
    title: "React Easy/Button",
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            controls: {
                exclude: ['onClick']
            }
        }
    },
    argTypes: {
        disabled: {
            table: {
                defaultValue: { summary: false },
            },
            description: "Whether to disable the button."
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
            description: "Variant of the button"
        },
    },
    args: {
        label: "Click me",
        disabled: false,
        onClick: action("Button clicked"),
    }
} as Meta;

type ButtonStory = StoryObj<typeof Button>

export const Primary: ButtonStory = {
    args: {
        group: "primary"
    }
}

export const Secondary: ButtonStory = {
    args: {
        group: "secondary"
    }
}

export const Text: ButtonStory = {
    args: {
        group: "text"
    }
}

