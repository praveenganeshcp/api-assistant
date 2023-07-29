
export interface SideTabContentProps {
    title: string;
    children: unknown | unknown[];
    disabled?: boolean
}

export function SideTabContent(props: SideTabContentProps) {
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {props.children}
        </>
    )
}