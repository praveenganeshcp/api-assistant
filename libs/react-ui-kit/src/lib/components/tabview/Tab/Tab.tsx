
export interface TabProps {
    title: string;
    children: unknown;
    disabled?: boolean
}

export function Tab(props: TabProps) {
    return (
        <>
            {props.children}
        </>
    )
}