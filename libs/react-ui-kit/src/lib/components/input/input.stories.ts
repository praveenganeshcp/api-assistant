import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { Input } from "./Input";

export default {
    title: "React Easy/Input",
    component: Input
} as Meta

type Story = StoryObj<typeof Input>

export const Demo: Story = {
    args: {
        id: "username",
        placeholder: "Username"
    },
    play: async({canvasElement}) => {
        const canvas = within(canvasElement);
        const emailInput = canvas.getByRole('textbox');
        await userEvent.type(emailInput, 'Hello, this is the react easy input component', {
            delay: 100,
        });
    }
}
