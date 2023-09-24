import { TableBody, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TableBodyComponent = ({ bodyArray }) => {
  const navigate = useNavigate();
  const handleClick = (a) => {
    navigate(`/admin/patients/patient-profile/${a[0]}`);
  };

  return (
    <TableBody>
      {bodyArray.map((tableRow, index) => {
        return (
          <TableRow hover key={index} onClick={() => handleClick(tableRow)}>
            {tableRow.map((tableCell, index) => {
              return <TableCell key={index}>{tableCell}</TableCell>;
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyComponent;
