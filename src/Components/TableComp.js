import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTheame } from "../Context/TheamContext";

export default function TableComp({ data }) {
  
  const { theame } = useTheame();
  const styleObj = {
    color: theame.textColor,
    textAlign: 'center'
  };
  return (
    <div className="table">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styleObj}>WPM</TableCell>
              <TableCell style={styleObj}>Accuracy</TableCell>
              <TableCell style={styleObj}>Characters (✅ / ❌ / )</TableCell>
              <TableCell style={styleObj}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((i) => (
              <TableRow>
                <TableCell style={styleObj}>{i.WordsPerMin}</TableCell>
                <TableCell style={styleObj}>{i.AccuracyScore}</TableCell>
                <TableCell style={styleObj}>{i.Characters}</TableCell>
                <TableCell style={styleObj}>{i.timeStamp.toDate().toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
