import React, { useState, useContext, useEffect } from "react";
import styles from "./LeavesWBS.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});
var leavesCount = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
var leaveshalfCount = [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
];
var TotlaLeaves = 0;
export default function LeavesWBS() {
    const classes = useStyles2();
    const { ActiveEmployeeNames } = useContext(RootContext);
    const [optionsYears, setOptionsYears] = useState([
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
    ]);

    const [monthName, setMonthName] = useState([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]);

    const [selected, setSelected] = useState("");
    const [yearsValue, setYearsValue] = useState("");
    const [leavesReport, setLeavesReport] = useState([]);
    const history = useHistory();
    const [flag, setFlag] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const yearsChangeHandle = (event) => {
        setYearsValue(event.target.value);
    };

    const Chevron = () => {
        return (
            <span className={styles.dropDownCustomizeSvg}>
                <SVG src={`/images/downArrow.svg`} />
            </span>
        );
    };

    const leavesSearch = () => {
        setFlag(true);
        setOpen(true);
        TotlaLeaves = 0;
        var attendanceArr = [];
        if (selected && yearsValue) {
            for (var i = 0; i < 12; i++) {
                leavesCount[i] = 0;
                leaveshalfCount[i] = 0;
            }
            fetch(
                `https://devbox-attendance.herokuapp.com/api/leaves/schedule/${selected}/${yearsValue}`
            )
                .then((res) => res.json())
                .then(
                    (response) => {
                        for (var i = 0; i < response.length; i++) {
                            attendanceArr.push(response[i]);
                            var date = new Date(response[i].date);
                            var month = date.getMonth();
                            var temphalf = leaveshalfCount[month];
                            var temp = leavesCount[month];
                            if (
                                response[i].status == "half" ||
                                response[i].status == "Half"
                            ) {
                                leaveshalfCount[month] = parseFloat(
                                    temphalf + 1
                                );
                            } else if (
                                response[i].status == "full" ||
                                response[i].status == "Full"
                            ) {
                                leavesCount[month] = parseFloat(temp + 1);
                            } else {
                                leavesCount[i] = 0;
                                leaveshalfCount[i] = 0;
                            }
                        }
                        for (var i = 0; i < leavesCount.length; i++) {
                            TotlaLeaves =
                                TotlaLeaves +
                                (leavesCount[i] + leaveshalfCount[i] / 2);
                        }
                        setLeavesReport(response);
                        setOpen(false);
                    },
                    (error) => {
                        setFlag(false);
                        console.log("error", error);
                    }
                );
        }
    };

    return (
        <>
            <div className={styles.backDropZindex}>
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                >
                <CircularProgress color="primary" /><span className={styles.loadingText}>Loading....</span>
                </Backdrop>
            </div>
            <div className={styles.breadCrumbsContainer}>
                <div className={styles.breadCrumbsSubContainer}>
                    <SVG
                        className={styles.dashboardSvg}
                        src={`/images/holidays.svg`}
                    />
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>Leaves</span>
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>WBS</span>
                </div>
                <h1 className={styles.breadCrumbSpan2}>Leaves WBS</h1>
            </div>
            <div className={styles.mainCard}>
                <div className={styles.gridContainer}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={1}
                            className={styles.gridSubItems}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={5}
                                className={styles.fieldGrid}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        className={styles.fieldDiv}
                                        id="employees"
                                        fullWidth
                                        size="small"
                                        label="Employee"
                                        variant="outlined"
                                        value={selected}
                                        onChange={handleChange}
                                        menuprops={{ variant: "menu" }}
                                        select
                                        SelectProps={{
                                            IconComponent: () => <Chevron />,
                                        }}
                                    >
                                        {ActiveEmployeeNames.map((option) => (
                                            <MenuItem
                                                key={option.name}
                                                value={
                                                    option.employee_external_id
                                                }
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={5}
                                className={styles.fieldGrid}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        className={styles.fieldDiv}
                                        id="years"
                                        fullWidth
                                        size="small"
                                        label="Years"
                                        variant="outlined"
                                        value={yearsValue}
                                        onChange={yearsChangeHandle}
                                        menuprops={{ variant: "menu" }}
                                        select
                                        SelectProps={{
                                            IconComponent: () => <Chevron />,
                                        }}
                                    >
                                        {optionsYears.map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={1}
                            className={styles.gridSubItems}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={1}
                                className={styles.fieldGrid}
                            >
                                <Button
                                    id="populate"
                                    variant="contained"
                                    color="primary"
                                    className={styles.saveButton}
                                    onClick={leavesSearch}
                                >
                                    Populate
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
            {!flag ? (
                ""
            ) : (
                <div className={styles.flex}>
                    <TableContainer component={Paper} className={styles.table}>
                        <Table
                            className={classes.table}
                            aria-label="custom pagination table"
                        >
                            <TableHead className={styles.tableHeader}>
                                <TableRow>
                                    <TableCell className={styles.TableCell}>
                                        Months
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Half Leaves
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Full Leaves
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Total Leaves
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!flag
                                    ? ""
                                    : leavesReport.length < 1
                                    ? leavesCount.map((row, i) => (
                                          <TableRow key={i}>
                                              <TableCell
                                                  className={styles.nameCells}
                                              >
                                                  {monthName[i]}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {leaveshalfCount[i]}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row + leaveshalfCount[i] / 2}
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : leavesCount.map((row, i) => (
                                          <TableRow key={i}>
                                              <TableCell
                                                  className={styles.nameCells}
                                              >
                                                  {monthName[i]}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {leaveshalfCount[i]}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row + leaveshalfCount[i] / 2}
                                              </TableCell>
                                          </TableRow>
                                      ))}
                                {!flag ? (
                                    ""
                                ) : (
                                    <>
                                        <TableRow>
                                            <TableCell
                                                className={styles.nameCells}
                                                colSpan="3"
                                            >
                                                <b>Total Leaves</b>
                                            </TableCell>
                                            <TableCell
                                                className={styles.subCells}
                                            >
                                                {TotlaLeaves}
                                            </TableCell>
                                        </TableRow>
                                        {/* <TableRow>
                                            <TableCell
                                                className={styles.nameCells}
                                                colSpan="2"
                                            >
                                                <b>Reaming Leaves</b>
                                            </TableCell>
                                            <TableCell
                                                className={styles.subCells}
                                                colSpan="2"
                                            >
                                                {15 - TotlaLeaves}
                                            </TableCell>
                                        </TableRow>*/}
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </>
    );
}
