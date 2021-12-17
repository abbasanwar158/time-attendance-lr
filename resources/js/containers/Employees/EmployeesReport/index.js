import React, { useState, useContext, useEffect } from "react";
import styles from "./EmployeesReport.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RootContext } from "../../../context/RootContext";
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { parseInt } from "lodash";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

var hoursCount = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
var TotalHours = 0;
var TotalLeaves = 0;
export default function EmployeesReport() {
    const { ActiveEmployeeNames } = useContext(RootContext);
    const [personName, setPersonName] = useState("");
    const [totalTime, setTotalTime] = useState("");
    const [totalLeaves, setTotalLeaves] = useState("");
    const [currentYear, setCurrentYear] = useState("");
    const [flag, setFlag] = useState(false);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [optionsYears, setOptionsYears] = useState([
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
    ]);
    const [selectedYear, setSelectedYear] = useState(optionsYears[0]);
    const [employeesReport, setEmployeesReport] = useState("");
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

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    const Chevron = () => {
        return (
            <span className={styles.dropDownCustomizeSvg}>
                <SVG src={`/images/downArrow.svg`} />
            </span>
        );
    };

    const handleChangeYears = (event) => {
        setSelectedYear(event.target.value);
    };

    useEffect(() => {
        leavesFun();
    }, []);

    const leavesFun = () => {
        // var leavesArr = [];
        // fetch("http://attendance.devbox.co/api/v1/leaves")
        //   .then(res => res.json())
        //   .then(
        //     (response) => {
        //       var data = response.data
        //       for (var i = 0; i < data.length; i++) {
        //         leavesArr.push(data[i])
        //       }
        //       setLeavesData(leavesArr)
        //     },
        //     (error) => {
        //       console.log("error", error)
        //     }
        //   )
    };
    const leavesSearch = () => {
        //setFlag(true);
        TotalLeaves = 0;
        var attendanceArr = [];
        var leavesCount = [];
        var leaveshalfCount = [];
        if (personName && selectedYear) {
            for (var i = 0; i < 12; i++) {
                leavesCount[i] = 0;
                leaveshalfCount[i] = 0;
                setTotalLeaves(0);
            }
            fetch(
                `https://time-attendance-lr.herokuapp.com/api/leaves/schedule/${personName}/${selectedYear}`
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
                            TotalLeaves =
                                TotalLeaves +
                                (leavesCount[i] + leaveshalfCount[i] / 2);

                            setTotalLeaves(TotalLeaves);
                        }
                        // setLeavesReport(response);
                    },
                    (error) => {
                        //setFlag(false);
                        console.log("error", error);
                    }
                );
        }
    };
    const searchEmployee = () => {
        setOpen(true);
        setFlag(true);
        for (var i = 0; i < hoursCount.length; i++) {
            hoursCount[i] = 0;
            TotalHours = 0;
            setTotalTime(0);
            setCurrentYear(0);
        }
        var attendanceArr = [];
        fetch(
            `https://time-attendance-lr.herokuapp.com/api/employees/report/${personName}/${selectedYear}`
        )
            .then((res) => res.json())
            .then(
                (response) => {
                    setOpen(false);
                    for (var i = 0; i < response.length; i++) {
                        attendanceArr.push(response[i]);
                        var date = new Date(response[i].checkin);
                        var date1 = new Date(response[i].checkout);
                        var month = date.getMonth();
                        var time = date.getHours();
                        var time1 = date1.getHours();
                        var totalTime = parseInt(time1 - time);
                        console.log(totalTime);
                        var temp = hoursCount[month];
                        hoursCount[month] = parseInt(temp + totalTime);
                    }

                    leavesSearch();
                    setEmployeesReport(attendanceArr);

                    for (var i = 0; i < 12; i++) {
                        TotalHours = TotalHours + hoursCount[i];
                        setTotalTime(TotalHours);
                    }
                    var year = new Date().getFullYear();
                    var x = new Date(attendanceArr[0].joining_date);
                    x = x.getFullYear();

                    setCurrentYear(year - x);

                },
                (error) => {
                    setOpen(false);
                    setFlag(false);
                    console.log("error", error);
                }
            );
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
                    <span className={styles.breadCrumbsSpan}>Employees</span>
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>report</span>
                </div>
                <h1 className={styles.breadCrumbSpan2}>
                    Employee report ({selectedYear})
                </h1>
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
                                sm={3}
                                className={styles.fieldGrid}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        className={styles.fieldDiv}
                                        value={personName}
                                        id="Employee_report_employee"
                                        fullWidth
                                        size="small"
                                        label="Employee"
                                        variant="outlined"
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
                            <Grid item xs={12} sm={2}>
                                <div>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="Employee_report_years"
                                            fullWidth
                                            size="small"
                                            label="Years"
                                            variant="outlined"
                                            className={styles.fieldDiv}
                                            value={selectedYear}
                                            onChange={handleChangeYears}
                                            menuprops={{ variant: "menu" }}
                                            select
                                            SelectProps={{
                                                IconComponent: () => (
                                                    <Chevron />
                                                ),
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
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={2}
                                className={styles.buttonDiv}
                            >
                                <Button
                                    id="Employee_report_populate"
                                    variant="contained"
                                    color="primary"
                                    className={styles.cardButtons}
                                    onClick={searchEmployee}
                                >
                                    Populate
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
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
                                sm={4}
                                className={styles.fieldGrid2}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        className={styles.fieldDiv2}
                                        id="Employee_report_name"
                                        fullWidth
                                        size="small"
                                        label="Name"
                                        type="text"
                                        variant="outlined"
                                        disabled={true}
                                        value={
                                            employeesReport.length > 0
                                                ? employeesReport[0].name
                                                : ""
                                        }
                                    ></TextField>
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
                                sm={4}
                                className={styles.fieldGrid2}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        className={styles.fieldDiv2}
                                        id="Employee_report_jDate"
                                        fullWidth
                                        size="small"
                                        label="Joining Date"
                                        type="text"
                                        variant="outlined"
                                        disabled={true}
                                        value={
                                            employeesReport.length > 0
                                                ? employeesReport[0]
                                                      .joining_date
                                                : ""
                                        }
                                    ></TextField>
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
                                sm={4}
                                className={styles.fieldGrid2}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        className={styles.fieldDiv2}
                                        id="Employee_report_yearsSpent"
                                        fullWidth
                                        size="small"
                                        label="Spent Year in devbox"
                                        type="text"
                                        variant="outlined"
                                        disabled={true}
                                        value={currentYear}
                                    ></TextField>
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
                                sm={4}
                                className={styles.fieldGrid2}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        className={styles.fieldDiv2}
                                        id="Employee_report_leavesInyear"
                                        fullWidth
                                        size="small"
                                        label="Leaves in Year"
                                        type="text"
                                        variant="outlined"
                                        disabled={true}
                                        value={totalLeaves}
                                    ></TextField>
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
                                sm={4}
                                className={styles.fieldGrid2}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        className={styles.fieldDiv2}
                                        id="Employee_report_hoursInYear"
                                        fullWidth
                                        size="small"
                                        label="Hours in Year"
                                        type="text"
                                        variant="outlined"
                                        disabled={true}
                                        value={totalTime}
                                    ></TextField>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    {!flag ? (
                        ""
                    ) : employeesReport.length == 0 ? (
                        ""
                    ) : (
                        <Grid item xs={12}>
                            <Grid
                                container
                                spacing={1}
                                className={styles.gridSubItems}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                    className={styles.fieldGrid2}
                                >
                                    <TableContainer className={styles.table}>
                                        <Table aria-label="custom pagination table">
                                            <TableHead
                                                className={styles.tableHeader}
                                            >
                                                <TableRow>
                                                    <TableCell
                                                        className={
                                                            styles.TableCell
                                                        }
                                                    >
                                                        Months
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            styles.TableCell
                                                        }
                                                    >
                                                        Time in Hours
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {employeesReport.length < 0
                                                    ? " "
                                                    : hoursCount.map(
                                                          (row, i) => (
                                                              <TableRow key={i}>
                                                                  <TableCell
                                                                      className={
                                                                          styles.nameCells
                                                                      }
                                                                  >
                                                                      {
                                                                          monthName[
                                                                              i
                                                                          ]
                                                                      }
                                                                  </TableCell>
                                                                  <TableCell
                                                                      className={
                                                                          styles.subCells
                                                                      }
                                                                  >
                                                                      {
                                                                          hoursCount[
                                                                              i
                                                                          ]
                                                                      }
                                                                  </TableCell>
                                                              </TableRow>
                                                          )
                                                      )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </div>
            </div>
        </>
    );
}
