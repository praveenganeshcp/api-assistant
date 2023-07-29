
export interface SideTabContentProps {
    /**
     * Title of the tab
     */
    title: string;
    /**
     * Tab HTML content
     */
    children: unknown | unknown[];
    /**
     * Whether the tab is disabled.
     */
    disabled?: boolean
}

/**
 * Renders the `children` prop as tab content.
 */
export function SideTabContent(props: SideTabContentProps) {
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {props.children}
        </>
    )
}