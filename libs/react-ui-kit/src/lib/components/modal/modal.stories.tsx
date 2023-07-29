import { Modal } from "./Modal";
import type { Meta, StoryObj } from '@storybook/react';

export default {
    title: 'React Easy/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{height: '100vh', width: '100vw'}}>
                <Story />
            </div>
        )
    ],
    argTypes: {
        title: {
            description: "Title to shown on modal header",
        },
        isOpen: {
            table: {
                defaultValue: { summary: 'false' }
            },
            description: "Whether modal is open",
        },
        primaryCTALabel: {
            description: "Label for Primary action button. Button will be shown only if text is provided and respective handler is provided"
        },
        onPerformPrimaryAction: {
            description: "Method to handle primary action"
        },
        secondaryCTALabel: {
            description: "Label for Secondary action button. Button will be shown only if label and respective handler is provided."
        },
        onPerformSecondaryAction: {
            description: "Method to handle secondary action"
        },
        onClose: {
            description: "Method will be trigerred when modal is closed"
        },
        children: {
            description: "Modal body HTML content",
        }
    }
} as Meta

type Story = StoryObj<typeof Modal>;

export const Demo: Story = {
    args: {
        isOpen: true,
        secondaryCTALabel: "Cancel",
        primaryCTALabel: "Confirm",
        onPerformSecondaryAction: () => {console.log('on cancel')},
        onPerformPrimaryAction: () => {console.log('on confirm')},
        children: <span>Modal body content</span>,
        title: "Add Modal title",
        onClose: () => {console.log('closed')}
    }
}