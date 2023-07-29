import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { ButtonProps } from "./Button";

describe('Button component should', () => {

    let buttonElement: HTMLButtonElement;

    function mountComponent(props: Omit<ButtonProps, "label"> = {}) {
        render(<Button label="Click me" {...props} />);
        buttonElement = screen.getByRole("button");
    }

    test('be rendered in the DOM', () => {
        mountComponent()
        expect(buttonElement).toBeDefined();
        expect(buttonElement).toBeInstanceOf(HTMLButtonElement)
    })

    test('render the given label', () => {
        mountComponent();
        expect(buttonElement.innerHTML).toBe("Click me");
    })

    test('invoke onClick handler if provided', () => {
        const onClickMockHandler = jest.fn();
        mountComponent({ onClick: onClickMockHandler })
        fireEvent.click(buttonElement);
        expect(onClickMockHandler).toBeCalled();
    })

    test("render in small dimension for 'small' size input", () => {
        mountComponent({ size: "small"})
        expect(buttonElement.classList).toContain('small-size');
    })

    test("render in medium dimension for 'medium' size input", () => {
        mountComponent({ size: "medium" })
        expect(buttonElement.classList).toContain('medium-size');
    })

    test("render in group dimension for 'large' size input", () => {
        mountComponent({ size: "large" })
        expect(buttonElement.classList).toContain('large-size');
    })

    test("render in primary color for 'primary' group input", () => {
        mountComponent({ group: "primary"})
        expect(buttonElement.classList).toContain('primary-group');
    })

    test("render in transparent color for 'secondary' group input", () => {
        mountComponent({ group: "secondary" })
        expect(buttonElement.classList).toContain('secondary-group');
    })

    test("render in plain text for 'text' group input", () => {
        mountComponent({ group: "text" })
        expect(buttonElement.classList).toContain('text-group');
    })
    
})

