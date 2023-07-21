import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

export default {
    component: Button,
    title: "React Easy/Button"
} as Meta;

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        group: "primary",
        size: "medium",
        label: "Click me"
    }
}

Primary.storyName = "Button"