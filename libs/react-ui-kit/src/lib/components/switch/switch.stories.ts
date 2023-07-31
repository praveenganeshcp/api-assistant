import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Switch } from "./Switch";

export default {
    title: "React Easy/Switch",
    component: Switch
} as Meta;

type SwitchStory = StoryObj<typeof Switch>

export const Demo: SwitchStory = {
    args: {
        isOn: false,
        handleChange: action("Switch toggled"),
        disabled: false
    },
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        isOn: {
            description: `This prop determines whether the switch is in the "on" or "off" state. 
            It is a required prop, and its value must be controlled by the parent 
            component to manage the state of the switch.`
        },
        disabled: {
            description: `This prop specifies whether the switch is disabled or not. 
            If set to true, the switch will be non-interactive, and users cannot change its state.`
        },
        handleChange: {
            description: `This prop is a callback function that gets triggered 
            whenever the switch state changes. It receives the new state 
            (true for "on" and false for "off") as an argument.`
        }
    }
}