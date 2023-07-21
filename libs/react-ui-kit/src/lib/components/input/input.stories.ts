import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

export default {
    title: "React Easy/Input",
    component: Input
} as Meta

type Story = StoryObj<typeof Input>

export const Primary: Story = {
    args: {
        id: "username",
        placeholder: "Username"
    },
}
Primary.storyName = "Input"
