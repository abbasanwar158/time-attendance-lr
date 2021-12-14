import React, { useState, useContext, useEffect } from "react";
import styles from "./MailToEmployees.module.scss";
import SVG from "react-inlinesvg";
import { RootContext } from "../../../context/RootContext";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';


const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function MailToEmployees() {
    const classes = useStyles2();
    const { ActiveEmployeeNames } = useContext(RootContext);
    const history = useHistory();

    return (
        <>
          <div className={styles.breadCrumbsContainer}>
            <div className={styles.breadCrumbsSubContainer}>
              <SVG
                className={styles.dashboardSvg}
                src={`/images/holidays.svg`}
              />
              <span className={styles.breadCrumbsSlash}>/</span>
              <span className={styles.breadCrumbsSpan}>Email to</span>
              <span className={styles.breadCrumbsSlash}>/</span>
              <span className={styles.breadCrumbsSpan}>Employees</span>
            </div>
            <h1 className={styles.breadCrumbSpan2}>Sent Emails</h1>
            <div className={styles.mt1}>
              <Button
                id="compose"
                variant="contained"
                color="primary"
                onClick= {() => { history.push('/employees/mail/new')}}              
              >
                Compose
              </Button>
            </div>
          </div>
          <div className={styles.flex}>
            <TableContainer component={Paper} className={styles.table}>
              <Table
                className={classes.table}
                aria-label="custom pagination table"
              >
                <TableHead className={styles.tableHeader}>
                  <TableRow>
                    <TableCell className={styles.TableCell}>Date</TableCell>
                    <TableCell className={styles.TableCell}> Subject </TableCell>
                    <TableCell className={styles.TableCell}>Body</TableCell>
                    <TableCell className={styles.TableCell}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={styles.subCells}>Dummy Data</TableCell>
                    <TableCell className={styles.subCells}>Dummy Data</TableCell>
                    <TableCell className={styles.subCells}>Dummy Data</TableCell>
                    <TableCell className={styles.subCells}>
                      <button
                        onClick={(e) => {
                          history.push('/employees/mail/edit')
                        }}
                      >Edit</button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
    );
}
