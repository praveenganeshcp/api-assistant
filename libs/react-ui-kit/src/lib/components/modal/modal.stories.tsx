import { Modal } from "./Modal";
import type { Meta, StoryObj } from '@storybook/react';

export default {
    title: 'React Easy/Modal',
    component: Modal
} as Meta

type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
    args: {
        isOpen: true,
        cancelText: "Cancel",
        confirmText: "Confirm",
        onCancel: () => {console.log('on cancel')},
        onConfirm: () => {console.log('on confirm')},
        children: <span>Hello</span>,
        title: "Add Modal title"
    }
}
Primary.storyName = "Modal"