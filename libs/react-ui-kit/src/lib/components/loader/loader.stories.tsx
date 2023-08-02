import { Meta, StoryObj } from "@storybook/react";
import { Loader } from "./Loader";

export default {
    title: "React Easy/Loader",
    component: Loader,
    parameters: {
        layout: 'centered',
        docs: {
            controls: {
                exclude: ['style']
            }
        }
    },
    argTypes: {
        size: {
            description: "Size of the loader"
        }
    }
} as Meta;

type LoaderStory = StoryObj<typeof Loader>;

export const Demo: LoaderStory = {
    args: {
        size: "large"
    }
}