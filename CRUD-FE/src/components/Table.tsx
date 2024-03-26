import {
  Box,
  Paper,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  styled,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { FC, memo, useMemo, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import AnimeDialog from "./AnimeDialog";
import axios from "axios";

export const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;

export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
  isFetching?: boolean;
  headerComponent?: JSX.Element;
  onClickRow?: (cell: Cell<any, unknown>, row: Row<any>) => void;
  EmptyText?: string;
  handleRow?: () => void;
}

const Table: FC<TableProps> = ({
  data,
  columns,
  isFetching,
  headerComponent,
  onClickRow,
  EmptyText,
  handleRow,
}) => {
  const memoizedData = useMemo(() => data, [data]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentRowId, setCurrentRowId] = useState<string>();
  const memoizedColumns = useMemo(() => columns, [columns]);
  const [expandedDescription, setExpandedDescription] = useState<string | null>(
    null
  );

  const memoisedHeaderComponent = useMemo(
    () => headerComponent,
    [headerComponent]
  );

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const noDataFound =
    !isFetching && (!memoizedData || memoizedData.length === 0);

  const handleRowClick = (rowId: string | null) => {
    if (expandedDescription === rowId) {
      setExpandedDescription(null);
    } else {
      setExpandedDescription(rowId);
    }
  };

  const handleEditDialog = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleDelete = async (animeId: number) => {
    await axios.delete(`http://localhost:4000/anime/${animeId}`);
    window.location.reload();
  };

  return (
    <Paper elevation={2} style={{ padding: "0 0 1rem 0" }}>
      <AnimeDialog
        isOpen={isEditOpen}
        handleDialogChange={handleEditDialog}
        animeId={currentRowId}
      />
      <Box paddingX="1rem">
        {memoisedHeaderComponent && <Box>{memoisedHeaderComponent}</Box>}
      </Box>
      <Box style={{ height: "500px", overflowX: "auto" }}>
        <MuiTable>
          {!isFetching && (
            <TableHead style={{ borderBottom: "5px" }}>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-[#000]">
                  <TableCell
                    width="5px"
                    className="text-[#2E353A] text-base font-graphik"
                  />
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      align="center"
                      key={header.id}
                      className="text-white text-sm font-cambon"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                  <TableCell
                    width="80px"
                    className="text-[#2E353A] text-base font-graphik"
                  />
                </TableRow>
              ))}
            </TableHead>
          )}

          <TableBody>
            {!isFetching &&
              getRowModel()?.rows.map((row) => (
                <>
                  <StyledTableRow key={row.id} onClick={handleRow}>
                    <TableCell width="5px">
                      <IconButton
                        aria-label={
                          row.original.showDescription ? "Collapse" : "Expand"
                        }
                        onClick={() => handleRowClick(row.id)}
                      >
                        {expandedDescription === row.id ? (
                          <MdExpandLess />
                        ) : (
                          <MdExpandMore />
                        )}
                      </IconButton>
                    </TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        align="center"
                        onClick={() => onClickRow?.(cell, row)}
                        key={cell.id}
                        className="text-[#2E353A] text-base font-graphik"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    <TableCell
                      align="center"
                      className="text-[#2E353A] text-base font-graphik"
                      width="80px"
                    >
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          setCurrentRowId(row.original.id);
                          setIsEditOpen(!isEditOpen);
                        }}
                      >
                        <FiEdit2 />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          handleDelete(row.original.id);
                        }}
                      >
                        <MdOutlineDeleteOutline />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                  <StyledTableRow key={row.id} onClick={handleRow}>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={expandedDescription === row.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <p>{row.original.description}</p>
                      </Collapse>
                    </TableCell>
                  </StyledTableRow>
                </>
              ))}
          </TableBody>
        </MuiTable>
        {noDataFound && (
          <Box
            padding="30px"
            display="flex"
            textAlign="center"
            justifyContent="center"
          >
            {EmptyText}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

Table.defaultProps = {
  EmptyText: "No Data found",
};

export default memo(Table);
