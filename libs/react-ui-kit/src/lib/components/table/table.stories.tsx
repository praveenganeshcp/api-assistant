import { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";

export default {
    title: "React Easy/Table",
    component: Table 
} as Meta;

type Story = StoryObj<typeof Table>
export const SimpleTable: Story = {
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

SimpleTable.storyName = "Table"
