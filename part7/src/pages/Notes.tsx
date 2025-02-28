import React from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { Paper } from "@mui/material";

const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <ul></ul>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Important</TableCell>
              <TableCell>#</TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {notes.map((note, i) => (
              <TableRow
                key={note.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell>{note.id}</TableCell>
                <TableCell>{note.content}</TableCell>
                <TableCell className="">
                  {note.important ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    className="btn btn-sm btn-primary"
                    to={`/notes/${note.id}`}
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Notes;
