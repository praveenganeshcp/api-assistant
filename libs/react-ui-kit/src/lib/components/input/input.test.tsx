import { render, screen } from "@testing-library/react";
import { Input, InputProps } from "./Input";

describe("Input component should", () => {

    let inputElement: HTMLInputElement;

    function mountComponent(props: InputProps = {}) {
        render(<Input {...props} />)
        inputElement = screen.getByRole("textbox")
    }

    test('render the input element in the DOM', () => {
        mountComponent();
        expect(inputElement).toBeDefined()
        expect(inputElement).toBeInstanceOf(HTMLInputElement)
    })

    test('render given placeholder text as the label for the input', () => {
        mountComponent({ placeholder: "Username", id: "user_name" })
        const labelElement: HTMLLabelElement = document.getElementsByTagName("label")[0];
        expect(labelElement).toBeInstanceOf(HTMLLabelElement);
        expect(labelElement.textContent).toBe("Username");
    })

    test("not render label if id is not provided", () => {
        mountComponent({ placeholder: "Username" })
        const labelElement: HTMLLabelElement = document.getElementsByTagName("label")[0];
        expect(labelElement).toBeUndefined();
    })

    test("not render label if placeholder is not provided", () => {
        mountComponent({ id: "user_name" })
        const labelElement: HTMLLabelElement = document.getElementsByTagName("label")[0];
        expect(labelElement).toBeUndefined();
    })
  
})