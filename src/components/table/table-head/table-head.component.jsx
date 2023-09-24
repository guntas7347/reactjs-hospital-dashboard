import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHeadComponent = ({ headingsArray }) => {
  return (
    <TableHead>
      <TableRow>
        {headingsArray.map((tableCell, index) => {
          return <TableCell key={index}>{tableCell}</TableCell>;
        })}
      </TableRow>
    </TableHead>
    // <thead>
    //   <tr>
    //     {headingsArray.map((heading) => {
    //       return <th>{heading}</th>;
    //     })}
    //   </tr>
    // </thead>
  );
};

export default TableHeadComponent;
