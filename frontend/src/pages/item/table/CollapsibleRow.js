import React, { useState, Fragment } from "react";
import { Table, TableBody, TableCell, TableRow, Collapse, IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import '../style.css';
import ConfirmDelete from './ConfirmDelete'

const useStyles = makeStyles({
    row: {
        '& > *': {
          borderBottom: 'unset',
          height: 'unset'
        },
    }
});

const CollapsibleRow = (props) => {
    const { row } = props;
    const [ open, setOpen ] = useState(false);
    const [ openConfirmDelete, setOpenConfirmDelete ] = useState(false);
    const classes = useStyles();

   

    const onDelete = () => {
      props.onDelete(row.id)
    }

    return (
      <Fragment>
        <TableRow className={classes.row}>
          <TableCell width="30">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
       
          <TableCell width="100">{row.name}</TableCell>
          <TableCell width="100">{row.desc}</TableCell>
          <TableCell width="100">{row.price}</TableCell>
          <TableCell width="100">{row.quantity}</TableCell>
          <TableCell width="100">{row.quote}</TableCell>

          <TableCell  >
            <div className="cell-button">
              <Link to={`/admin/item/edit/${row.id}`}>
                  <IconButton color="primary">
                      <EditIcon />
                  </IconButton>
              </Link>
              <ConfirmDelete
                title="Delete Confirmation"
                message="Are you sure want to delete this record?"
                onDelete={onDelete} 
                {...{ openConfirmDelete, setOpenConfirmDelete }} 
              />
            </div>
          </TableCell>
        </TableRow>

        <TableRow >
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Table size="medium" aria-label="detail" style={{marginBottom:"30px"}}>
                  <TableBody>
                    
                      <TableRow> 
                          <TableCell className="collapse-cell-title"> name </TableCell>
                          <TableCell className="collapse-cell-content"> {row.name} </TableCell>
                      </TableRow>
                      <TableRow> 
                          <TableCell className="collapse-cell-title"> desc </TableCell>
                          <TableCell className="collapse-cell-content"> {row.desc} </TableCell>
                      </TableRow>     <TableRow> 
                          <TableCell className="collapse-cell-title"> price </TableCell>
                          <TableCell className="collapse-cell-content"> {row.price} </TableCell>
                      </TableRow>     <TableRow> 
                          <TableCell className="collapse-cell-title"> quantity </TableCell>
                          <TableCell className="collapse-cell-content"> {row.quantity} </TableCell>
                      </TableRow>     <TableRow> 
                          <TableCell className="collapse-cell-title"> quote </TableCell>
                          <TableCell className="collapse-cell-content"> {row.quote} </TableCell>
                      </TableRow>

                  

                  </TableBody>
                </Table>
            </Collapse>
          </TableCell>
        </TableRow>
        
      </Fragment>
    );
}

export default CollapsibleRow;