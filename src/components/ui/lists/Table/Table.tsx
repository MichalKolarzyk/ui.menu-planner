import { useState } from "react";
import { ButtonStyle } from "../../buttons/button/Button";
import IconButton from "../../buttons/iconButton/IconButton";
import Flex, { FlexJustify } from "../../containers/flexes/Flex";
import { IconImage } from "../../icons/Icon";
import Label, { LabelSize } from "../../labels/label/Label";
import classes from "./Table.module.css";

const Table = (props: TableProps) => {
    const [items, setItems] = useState(props.items);
    const [columns, setColumns] = useState(props.columns);

    const sortHandler = (column: Column) => {
        const newItems = [...items.sort((a, b) => columnSort(column, a, b))];
        setItems(newItems);

        const newColumns = [...columns];
        newColumns.map((c) => (c.name == column.name ? (c.sorted = true) : (c.sorted = false)));
        setColumns(newColumns);
        console.log(newColumns);
    };

    const columnSort = (column: Column, a: any, b: any) => {
        if (column.sorter === undefined || column.sorter === null) {
            return props.defaultSorter(a[column.property], b[column.property]);
        }
        return column.sorter(a[column.property], b[column.property]);
    };

    const header = columns.map((col, index) => (
        <th className={classes.headerCell} key={index}>
            <Flex>
            <Label size={LabelSize.medium} bold italic>{col.name}</Label>
                <IconButton
                    onClick={() => sortHandler(col)}
                    image={col.sorted ? IconImage.sortDown : IconImage.sort}
                    style={ButtonStyle.transparent}
                />
            </Flex>
        </th>
    ));
    return (
        <>
            <table className={classes.table}>
                <thead className={classes.header}>{header}</thead>
                <tbody>
                    {items.map((item, index) => (
                        <TableRow key={index} item={item} onRowClick={props.onRowClick} columns={props.columns} />
                    ))}
                </tbody>
            </table>
        </>
    );
};

const TableRow = (props: RowProps) => {
    const onClickHandler = () => {
        props.onRowClick?.(props.item);
    };
    return (
        <tr className={classes.row} onClick={onClickHandler}>
            {props.columns.map((col, index) => (
                <td className={classes.cell} key={index}>
                    <Label size={LabelSize.medium}>{props.item[col.property]}</Label>
                </td>
            ))}
        </tr>
    );
};

type TableProps = {
    items: Array<any>;
    columns: Array<Column>;
    defaultSorter: (a: any, b: any) => number;
    onRowClick?: (row: any) => void;
};

type RowProps = {
    item: any;
    columns: Array<Column>;
    onRowClick?: (row: any) => void;
};

type Column = {
    name: string;
    property: string;
    sorted?: boolean;
    sorter?: (a: any, b: any) => number;
};

export default Table;
