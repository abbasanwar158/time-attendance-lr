import React, { useState, useContext, useEffect } from "react";
import styles from "./AttendanceReport.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { RootContext } from "../../../context/RootContext";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import clsx from "clsx";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AbsentTable from '../AbsentTable'

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function ManageAttendance() {
    const { ActiveEmployeeNames, setIndex, attendanceData, setAttendanceData } =
        useContext(RootContext);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [allData, setAllData] = useState(false);
    const [saturday, setSaturday] = useState(false);
    const [sunday, setSunday] = useState(false);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [flag, setflag] = useState(false);
    const [absentData, setAbsentData] = useState([])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 200,
            },
        },
    };

    const handleChange = (event) => {
        var values = event.target.value;
        setSelected(values);
    };

    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const startDateFun = (event) => {
        setStartDate(event.target.value);
    };

    const endDateFun = (event) => {
        setEndDate(event.target.value);
    };

    const allCheckboxFun = (event) => {
        setAllData(event.target.checked);
    };

    const sundayFun = (event) => {
        setSunday(!sunday);
    };

    const saturdayFun = (event) => {
        setSaturday(!saturday);
    };

    const Chevron = () => {
        return (
            <span className={styles.dropDownCustomizeSvg}>
                <SVG src={`/images/downArrow.svg`} />
            </span>
        );
    };

    const attendanceSearch = () => {
        setflag(false);
        setOpen(true);
        var attendanceArr = [];
        var absentArr = [];
        var id = selected;
        if (allData == true) {
            id = null;
            setSelected(null);
        }
        fetch(
            `https://devbox-attendance.herokuapp.com/api/attendance/report/${id}/${startDate}/${endDate}/${allData}/fff/sun`
        )
            .then((res) => res.json())
            .then(
                (response) => {
                    setAttendanceData("");

                    var data = response.filter((x) => x.active);
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].absent_status != 1){
                            if (saturday || sunday) {
                                var currentday = new Date(data[i].date);
                                var sunDay = currentday.getDay();
                                if (sunday && !saturday && sunDay == 0) {
                                    attendanceArr.push(data[i]);
                                } else if (saturday && !sunday && sunDay == 6) {
                                    attendanceArr.push(data[i]);
                                } else if (sunday && saturday) {
                                    if (sunDay == 0 || sunDay == 6) {
                                        attendanceArr.push(data[i]);
                                    }
                                } else {
                                    console.log("null");
                                }
                            } else {
                                attendanceArr.push(data[i]);
                            }
                            setflag(true);
                          }
                          else{
                            absentArr.push(data[i]);
                          }
                    }
                    setAbsentData(absentArr);
                    setAttendanceData(attendanceArr);
                    setOpen(false);
                },
                (error) => {
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
                    <span className={styles.breadCrumbsSpan}>Attendance</span>
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>Report</span>
                </div>
                <h1 className={styles.breadCrumbSpan2}>
                    Check Attendance Report
                </h1>
            </div>
            <div className={styles.mainCard}>
                {localStorage.isAdmin == 'true' ?
                    <div>
                        <Grid item xs={12}>
                            <Grid container spacing={1} className={styles.gridSubItems}>
                                <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                                    <FormControl fullWidth>
                                        <TextField
                                            className={styles.fieldDiv}
                                            id="Report_employees"
                                            fullWidth
                                            size="small"
                                            label="Employee"
                                            variant="outlined"
                                            disabled={allData}
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
                                                    value={option.employee_external_id}
                                                >
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} className={styles.gridSubItems}>
                                <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                                    <FormControl fullWidth>
                                        <TextField
                                            className={styles.fieldDiv}
                                            id="Report_fDate"
                                            label="From"
                                            type="date"
                                            variant="outlined"
                                            size="small"
                                            value={startDate}
                                            onChange={startDateFun}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} className={styles.gridSubItems}>
                                <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                                    <FormControl fullWidth>
                                        <TextField
                                            className={styles.fieldDiv}
                                            id="Report_tDate"
                                            label="To"
                                            type="date"
                                            variant="outlined"
                                            size="small"
                                            value={endDate}
                                            inputProps={{
                                                min:startDate ? startDate :"0000-00-00" ,
                                            }}
                                            onChange={endDateFun}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} className={styles.gridSubItems}>
                                <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                                    <FormControl>
                                        <FormControlLabel
                                            id="Report_allCheckbox"
                                            className={styles.allCheckbox}
                                            value="start"
                                            onChange={allCheckboxFun}
                                            control={<Checkbox color="primary" />}
                                            label="ALL"
                                            labelPlacement="end"
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} className={styles.gridSubItems}>
                                <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                                    <FormControl>
                                        <FormControlLabel
                                            id="Report_saturday"
                                            className={styles.satSunCheckbox}
                                            value="start"
                                            onChange={saturdayFun}
                                            control={<Checkbox color="primary" />}
                                            label="SATURDAY"
                                            labelPlacement="end"
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} className={styles.gridSubItems}>
                                <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                                    <FormControl>
                                        <FormControlLabel
                                            id="Report_sunday"
                                            className={styles.satSunCheckbox}
                                            value="start"
                                            onChange={sundayFun}
                                            control={<Checkbox color="primary" />}
                                            label="SUNDAY"
                                            labelPlacement="end"
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} className={styles.gridSubItems}>
                                <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                                    <Button
                                        id="Report_search"
                                        variant="contained"
                                        color="primary"
                                        onClick={attendanceSearch}
                                        className={styles.saveButton}
                                    >
                                        Generate Report
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                : null}

                <div className={styles.flex}>
                    <TableContainer component={Paper} className={styles.table}>
                        <Table
                            className={classes.table}
                            aria-label="custom pagination table"
                        >
                            <TableHead className={styles.tableHeader}>
                                <TableRow>
                                    <TableCell className={styles.TableCell}>
                                        Name
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Date
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Day
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Checkin
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Checkout
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Time Spend
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendanceData.length > 0
                                    ? (rowsPerPage > 0
                                          ? attendanceData.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                          : attendanceData
                                      ).map((row, i) => (
                                          <TableRow key={row.id}>
                                              <TableCell
                                                  className={styles.nameCells}
                                              >
                                                  {row.name}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row.date}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row.day}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row.checkin}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row.checkout}
                                              </TableCell>
                                              <TableCell
                                                  className={clsx(
                                                      row.timeSpend >= "09:00"
                                                          ? styles.time_spend_up
                                                          : styles.time_spend_down
                                                  )}
                                              >
                                                  {row.timeSpend}
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : flag && (
                                          <h2
                                              className={styles.breadCrumbSpan2}
                                          >
                                              No Record Found
                                          </h2>
                                      )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        className={styles.pagginationContainer}
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={6}
                                        count={attendanceData.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                "aria-label": "rows per page",
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={
                                            handleChangeRowsPerPage
                                        }
                                        ActionsComponent={
                                            TablePaginationActions
                                        }
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <AbsentTable setAbsentData={setAbsentData} absentData={absentData}  />
        </>
    );
}
