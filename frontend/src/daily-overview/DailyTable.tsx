import React, { useEffect, useState } from "react";
import { DailyGraph } from "./DailyGraph";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import type { DailyData } from "../types/electricity";
import { dateFormatForUI } from "../utils/formatters";
interface DailyTableProps {
  dailyData: Record<string, DailyData>;
}

interface Column {
  id:
    | "date"
    | "avg_daily_price"
    | "daily_production"
    | "daily_consumption"
    | "negative_streak";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "date", label: "Date", minWidth: 170 },
  {
    id: "avg_daily_price",
    label: "Average Price (c/kWh)",
    minWidth: 100,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "daily_production",
    label: "Daily Production (MWh/h)",
    minWidth: 170,
    align: "right",
    format: (value: number) =>
      value.toLocaleString("fi-FI", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
  {
    id: "daily_consumption",
    label: "Daily Consumption (MWh)",
    minWidth: 170,
    align: "right",
    format: (value: number) =>
      (value / 1000).toLocaleString("fi-FI", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
  {
    id: "negative_streak",
    label: "Longest Consecutive Negative Hourly Price",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

export function DailyTable({ dailyData }: DailyTableProps) {
  const [clickedDay, setClickedDay] = useState<string>("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    setPage(0);
    setClickedDay(Object.keys(dailyData)[0]);
  }, [dailyData]);
  const dates = Object.keys(dailyData);

  const details = dailyData[clickedDay] || dailyData[dates[0]];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <div key={clickedDay}>
          <DailyGraph dailyDetails={details} />
        </div>
      </div>

      <div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(dailyData)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(([dateKey, row]) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        onClick={() => setClickedDay(dateKey)}
                        key={dateFormatForUI(dateKey)}
                        sx={{
                          backgroundColor:
                            clickedDay === dateKey
                              ? "rgba(80, 113, 146, 0.12)"
                              : "inherit",
                          "& .MuiTableCell-root": {
                            color:
                              clickedDay === dateKey
                                ? "primary.main"
                                : "inherit",
                            fontWeight:
                              clickedDay === dateKey ? "bold" : "normal",
                          },
                          "&:hover": {
                            backgroundColor:
                              clickedDay === dateKey
                                ? "rgba(25, 118, 210, 0.2)"
                                : undefined,
                          },
                        }}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "date" ? (
                                <IconButton
                                  aria-label="expand row"
                                  size="small"
                                  onClick={() => setClickedDay(dateKey)}
                                >
                                  {clickedDay === dateKey ? (
                                    <KeyboardArrowUpIcon />
                                  ) : (
                                    <KeyboardArrowDownIcon />
                                  )}
                                </IconButton>
                              ) : (
                                <></>
                              )}
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : column.id === "date"
                                  ? dateFormatForUI(dateKey)
                                  : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={Object.entries(dailyData).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
