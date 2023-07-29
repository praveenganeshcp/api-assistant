import { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";

export default {
    title: "React Easy/Table",
    component: Table,
    argTypes: {
        rows: {
            description: "Array of objects to render as table rows. NOTE: Each object should have id key with unique value to identify rows."
        },
        columns: {
            description: "List of column configuration that defines how to render a cell content from the given row objects",
        }
    }
} as Meta;

type Story = StoryObj<typeof Table>
export const Demo: Story = {
    args: {
        rows: [
            { id: 1, name: "Praveen", college: "ABC", location: "abc", pincode: 123 },
            { id: 2, name: "Ganesh", college: "XYZ", location: "xyz", pincode: 345 },
            { id: 3, name: "Kumar", college: "BCD", location: "bcd", pincode: 567 },
        ],
        columns: [
            {
                id: 1,
                label: "ID",
                size: '20%',
                fieldName: "id"
            },
            {
                id: 2,
                label: "Name",
                size: "20%",
                fieldName: "name"
            },
            {
                id: 3,
                label: "College",
                size: "20%",
                fieldName: "college"
            },
            {
                id: 4,
                label: "Location",
                size: "20%",
                fieldName: "location"
            },
            {
                id: 5,
                label: "Pin code",
                size: "20%",
                fieldName: "pincode",
                render: (row, fieldName) => {
                    return <b>{row[fieldName]}</b>
                },
            }
        ]
    }
}
