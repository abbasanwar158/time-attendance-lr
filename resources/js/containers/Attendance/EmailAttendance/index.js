import React, { useState, useContext, useEffect } from "react";
import styles from "./EmailAttendance.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { RootContext } from "../../../context/RootContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

export default function EmailAttendance() {
    const [optionsMonths, setOptionsMonths] = useState([
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
    const [optionsYears, setOptionsYears] = useState([
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
    ]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [toAdmin, setToAdmin] = useState(false);
    const [open, setOpen] = useState(false);
    const { ActiveEmployeeNames, setIndex, attendanceData, setAttendanceData } =
        useContext(RootContext);

    const handleChangeMonths = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleChangeYears = (event) => {
        setSelectedYear(event.target.value);
    };

    const Chevron = () => {
        return (
            <span className={styles.dropDownCustomizeSvg}>
                <SVG src={`/images/downArrow.svg`} />
            </span>
        );
    };

    const EmailAttendance = () => {
        setOpen(true);
        console.log(ActiveEmployeeNames);

        fetch(`https://time-attendance-lr.herokuapp.com/api/attendance/email`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Month: selectedMonth,
                Year: selectedYear,
                admin: toAdmin,
            }),
        })
            .then((response) => response.text())
            .then((data) => {
                setOpen(false);
                console.log("Success:", data);
            })
            .catch((error) => {
                setOpen(false);
                console.error("Error:", error);
            });
    };

    return (
        <>
            <div className={styles.backDropZindex}>
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                >
                    <CircularProgress color="primary" size={100} />
                    <span className={styles.loadingText}>Loading....</span>
                </Backdrop>
            </div>
            <div className={styles.breadCrumbsContainer}>
                <div className={styles.breadCrumbsSubContainer}>
                    <SVG
                        className={styles.dashboardSvg}
                        src={`/images/holidays.svg`}
                    />
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>Attendance</span>
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>Email</span>
                </div>
                <h1 className={styles.breadCrumbSpan2}>Email Attendance123</h1>
            </div>
            <div className={styles.mainCard}>
                <div className={styles.gridContainer}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={1}
                            className={styles.gridSubItems}
                        >
                            <Grid item xs={12} sm={4}>
                                <div>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="questions"
                                            fullWidth
                                            size="small"
                                            label="Months"
                                            variant="outlined"
                                            value={selectedMonth}
                                            onChange={handleChangeMonths}
                                            className={styles.placeholderColor}
                                            menuprops={{ variant: "menu" }}
                                            select
                                            SelectProps={{
                                                IconComponent: () => (
                                                    <Chevron />
                                                ),
                                            }}
                                        >
                                            {optionsMonths.map((option) => (
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
                            <Grid item xs={12} sm={4}>
                                <div>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="questions"
                                            fullWidth
                                            size="small"
                                            label="Years"
                                            variant="outlined"
                                            className={styles.placeholderColor}
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
                            <Grid item xs={12} sm={2}>
                                <div className={styles.allCheckboxContainer}>
                                    <FormControl>
                                        <FormControlLabel
                                            className={styles.allCheckbox}
                                            value={toAdmin}
                                            onChange={() =>
                                                setToAdmin(!toAdmin)
                                            }
                                            control={
                                                <Checkbox color="primary" />
                                            }
                                            label="To Admin"
                                            labelPlacement="end"
                                        />
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={styles.cardButtons}
                                    onClick={EmailAttendance}
                                >
                                    Send Mail
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}
