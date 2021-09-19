import { Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow} from '@material-ui/core';

const MessageTable = ({data, onRowClick}) => {
  return (
    <>
      <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow variant='head'>
                    <TableCell>Canal</TableCell>
                    <TableCell>Gatilho</TableCell>
                    <TableCell>Timer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    data.map(
                      (message, idx) => (
                        <TableRow key={idx}
                          hover
                          style={{cursor: 'pointer'}}
                          onClick={()=>onRowClick(message)}>
                          <TableCell>{message.channel}</TableCell>
                          <TableCell>{message.trigger}</TableCell>
                          <TableCell>{message.timer}</TableCell>
                        </TableRow>
                      )
                    )
                  }
                </TableBody>
              </Table>
            </TableContainer>
    </>
  );
}

export default MessageTable;