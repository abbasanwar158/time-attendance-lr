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

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});
var leavesCount = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
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
        var attendanceArr = [];
        if (selected && yearsValue) {
            for (var i = 0; i < 12; i++) {
                leavesCount[i] = 0;
            }
            fetch(
                `https://time-attendance-lr.herokuapp.com/api/leaves/schedule/${selected}/${yearsValue}`
            )
                .then((res) => res.json())
                .then(
                    (response) => {
                        //var data = response.filter((x) => x.active);
                        for (var i = 0; i < response.length; i++) {
                            attendanceArr.push(response[i]);
                            var date = new Date(response[i].date);
                            var month = date.getMonth();
                            var temp = leavesCount[month];

                            leavesCount[month] = parseInt(temp + 1);
                        }
                        setLeavesReport(attendanceArr);
                    },
                    (error) => {
                        console.log("error", error);
                    }
                );
        }
    };

    return (
        <>
            <div className={styles.breadCrumbsContainer}>
                <div className={styles.breadCrumbsSubContainer}>
                    <SVG
                        className={styles.dashboardSvg}
                        src={`/images/holidays.svg`}
                    />
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>Leaves</span>
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>View</span>
                </div>
                <h1 className={styles.breadCrumbSpan2}>View All Leaves</h1>
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
                                        id="questions"
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
                                        id="questions"
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
                                    Leaves
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leavesReport.length == 0
                                ? ""
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
                                              {row}
                                          </TableCell>
                                      </TableRow>
                                  ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
