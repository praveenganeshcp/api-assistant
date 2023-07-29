
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SideTabContent } from "./side-tab-content/SideTabContent";
import { SideTabView } from "./side-tab-view/SideTabView";

export default {
    component: SideTabView,
    title: "React Easy/Side Tab view",
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        activeIndex: {
            table: {
                defaultValue: { summary: '0' },
            },
            description: "Currently focussed tab index. Index starts from 0."
        },
        titleWidth: {
            table: {
                defaultValue: { summary: '10' },
            },
            description: "Percentage of width to allocate for tab titles. Remaining space will be allocated for tab content."
        },
        onChangeTab: {
            description: "Fired when tab title is clicked."
        }
    }
} as Meta;

type SideTabViewStory = StoryObj<typeof SideTabView>;

export const Demo: SideTabViewStory = {
    render: (args) => (
        <div style={{width: '60vw'}}>
            <SideTabView {...args}>
                <SideTabContent title="Tab 1">content 1</SideTabContent>
                <SideTabContent title="Tab 2">content 2</SideTabContent>
                <SideTabContent title="Tab 3">content 3</SideTabContent>
                <SideTabContent title="Tab 4">content 4</SideTabContent>
            </SideTabView>
        </div>
    ),
    args: {
        titleWidth: 10,
        activeIndex: 0,
        onChangeTab: action('tab changed')
    }
}