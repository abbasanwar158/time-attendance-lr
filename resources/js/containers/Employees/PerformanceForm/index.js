import React, { useState, useContext, useEffect } from "react";
import styles from "./PerformanceForm.module.scss";
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

export default function LeavesRequests() {
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
              <span className={styles.breadCrumbsSpan}>Employee</span>
              <span className={styles.breadCrumbsSlash}>/</span>
              <span className={styles.breadCrumbsSpan}>Performace Form</span>
            </div>
            <h1 className={styles.breadCrumbSpan2}>Employee Performace Form</h1>
            <div className={styles.mt1}>
              <Button
                variant="contained"
                color="primary"
                onClick= {() => { history.push('/employees/performance_form/new')}}              
              >
                New Performance Form
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
                    <TableCell className={styles.TableCell}>Employee name</TableCell>
                    <TableCell className={styles.TableCell}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={styles.subCells}>Dummy Data</TableCell>
                    <TableCell className={styles.subCells}>Dummy Data</TableCell>
                    <TableCell className={styles.subCells}>
                      <button
                        onClick={(e) => {
                          // history.push('/leaves/requests/reply')
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
