"use client";
import { useCallback } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { TruthRow } from "@/interface";

interface Props {
  vars: string[];
  expressions: string[];
  truthData: TruthRow[];
}

export const TruthTable: React.FC<Props> = ({
  vars,
  expressions,
  truthData,
}) => {
  const renderCell = useCallback((cell: any, columnKey: any) => {
    const cellValue = cell[columnKey];
    return (
      <span
        className={
          cellValue === 0
            ? "text-danger"
            : cellValue === 1
            ? "text-success"
            : ""
        }
      >
        {cellValue === 0 ? "F" : cellValue === 1 ? "V" : ""}
      </span>
    );
  }, []);

  const columns = vars
    .map((v: any) => ({
      title: v,
      dataIndex: v,
      key: v,
    }))
    .concat(
      expressions.map((expr: any, exprIndex: any) => ({
        title: expr
          .replaceAll("&&", "∧")
          .replaceAll("||", "∨")
          .replaceAll("!", "¬")
          .replaceAll("and", "∧")
          .replaceAll("or", "∨")
          .replaceAll("not", "¬"),
        dataIndex: `expr${exprIndex}`,
        key: `expr${exprIndex}`,
      }))
    );

  return (
    
    <Table aria-label="Tabla de verdad" className="min-w-[280px]">
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn key={column.key} className="text-md">
            {column.title}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={truthData}>
        {(item: any) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
