import React, { useState, useContext, useEffect } from "react";
import styles from "./LeavesReport.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { RootContext } from "../../../context/RootContext";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import { set } from "lodash";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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

export default function LeavesReport() {
    const { ActiveEmployeeNames, setLeavesData, leavesData } =
        useContext(RootContext);
    const classes = useStyles2();
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [empLeaves, setEmpLeaves] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [selected, setSelected] = useState(null);
    const [flag, setflag] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const Chevron = () => {
        return (
            <span className={styles.dropDownCustomizeSvg}>
                <SVG src={`/images/downArrow.svg`} />
            </span>
        );
    };
    const JSON2CSV = (objArray) => {
        var array =
            typeof objArray != "object" ? JSON.parse(objArray) : objArray;
        var str =
            "name,active,employee_id,id,date,time,status,note,created_at \r\n";
        var line = "";

        if ($("#labels").is(":checked")) {
            var head = array[0];
            if ($("#quote").is(":checked")) {
                for (var index in array[0]) {
                    var value = index + "";
                    line += '"' + value.replace(/"/g, '""') + '",';
                }
            } else {
                for (var index in array[0]) {
                    line += index + ",";
                }
            }

            line = line.slice(0, -1);
            str += line + "\r\n";
        }

        for (var i = 0; i < array.length; i++) {
            var line = "";

            if ($("#quote").is(":checked")) {
                for (var index in array[i]) {
                    var value = array[i][index] + "";
                    line += '"' + value.replace(/"/g, '""') + '",';
                }
            } else {
                for (var index in array[i]) {
                    line += array[i][index] + ",";
                }
            }

            line = line.slice(0, -1);
            str += line + "\r\n";
        }
        return str;
    };

    const leavesFun = () => {
        var csv = JSON2CSV(leavesData);
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "data.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const generateReport = () => {
        setOpen(true);
        setflag(false);
        console.log(from, to, selected, empLeaves);
        var id = selected;
        if (empLeaves == true) {
            id = null;
            setSelected(null);
        }
        var leavesArr = [];
        fetch(
            `https://devbox-attendance.herokuapp.com/api/leaves/report/${id}/${from}/${to}/${empLeaves}`
        )
            .then((res) => res.json())
            .then(
                (response) => {
                    var data = response.filter((x) => x.active);
                    for (var i = 0; i < data.length; i++) {
                        leavesArr.push(data[i]);
                    }
                    setflag(true);
                    setLeavesData(leavesArr);
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
                    <span className={styles.breadCrumbsSpan}>Leave</span>
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>Leave Report</span>
                </div>
                <h1 className={styles.breadCrumbSpan2}>Check Leave Report</h1>
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
                                className={styles.fieldGrid}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        className={styles.fieldDiv}
                                        id="LeaveReport_employees"
                                        fullWidth
                                        size="small"
                                        label="Employee"
                                        variant="outlined"
                                        value={selected}
                                        disabled={!empLeaves ? false : true}
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
                                className={styles.fieldGrid}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        className={styles.fieldDiv}
                                        id="LeaveReport_fDate"
                                        label="From"
                                        type="date"
                                        variant="outlined"
                                        value={from}
                                        onChange={(event) =>
                                            setFrom(event.target.value)
                                        }
                                        //defaultValue="2021-07-29"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
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
                                className={styles.fieldGrid}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        className={styles.fieldDiv}
                                        id="LeaveReport_tDate"
                                        label="To"
                                        type="date"
                                        variant="outlined"
                                        value={to}
                                        inputProps={{
                                            min:from ? from :"0000-00-00" ,
                                        }}
                                        onChange={(event) =>
                                            setTo(event.target.value)
                                        }
                                        //defaultValue="2021-07-29"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
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
                                className={styles.checkboxGrid}
                            >
                                <FormControl>
                                    <FormControlLabel
                                        id="LeaveReport_all"
                                        className={styles.allCheckbox}
                                        value={empLeaves}
                                        onChange={(event) =>
                                            setEmpLeaves(!empLeaves)
                                        }
                                        control={<Checkbox color="primary" />}
                                        label="ALL"
                                        labelPlacement="end"
                                    />
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
                                className={styles.fieldGrid}
                            >
                                <Button
                                    id="LeaveReport_report"
                                    variant="contained"
                                    color="primary"
                                    className={styles.saveButton}
                                    onClick={generateReport}
                                    // disabled={from && to ? false : true}
                                >
                                    Generate Report
                                </Button>
                                <Button
                                    id="LeaveReport_download"
                                    variant="contained"
                                    color="secondary"
                                    onClick={leavesFun}
                                    disabled={
                                        leavesData.length > 0 ? false : true
                                    }
                                >
                                    Download
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
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
                                        Employee Name
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Time
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Date
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Leave Type
                                    </TableCell>
                                    <TableCell className={styles.TableCell}>
                                        Note
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leavesData.length > 0
                                    ? (rowsPerPage > 0
                                          ? leavesData.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                          : leavesData
                                      ).map((row) => (
                                          <TableRow>
                                              <TableCell
                                                  className={styles.nameCells}
                                              >
                                                  {row.name}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row.time}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row.date}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row.status}
                                              </TableCell>
                                              <TableCell
                                                  className={styles.subCells}
                                              >
                                                  {row.note}
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
                                        colSpan={5}
                                        count={leavesData.length}
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
        </>
    );
}
