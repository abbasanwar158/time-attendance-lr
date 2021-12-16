import React, { useState, useContext, useEffect } from "react";
import styles from "./Dashboard.module.scss";
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
import { useHistory, withRouter } from "react-router-dom";
import { RootContext } from"../../context/RootContext";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

export default function Dashboard() {
  const history = useHistory();
  const [months, setMonths] = useState('');
  const [years, setYears] = useState('');
  const [upHoliday, setUpHoliday] = useState(false);
  const [holidayName, setholidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [leavesInformation, setLeavesInformation] = useState([]);
  const [hoursInformation, setHoursInformation] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [noOfEmployees, setNoOfEmployees] = useState('');
  const [noOfLeaves, setNoOfLeaves] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [noOfEmplPresent, setNoOfEmplPresent] = useState('');
  const [loader, setLoader] = useState(false);
  const [loaderHours, setLoaderHours] = useState(false);
  const { ActiveEmployeeNames } = useContext(RootContext);
  const [open, setOpen] = useState(true);
  const [optionsMonths, setOptionsMonths] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ])
  const [optionsYears, setOptionsYears] = useState(['2021', '2020', '2019', '2018', '2017'])


  const handleChangeMonths = (event) => {
    setMonths(event.target.value);
  };

  const handleChangeYears = (event) => {
    setYears(event.target.value);
  };

  const handleChangeStartDate = (event) => {
    setStartDate(event.target.value);
  }

  const handleChangeEndDate = (event) => {
    setEndDate(event.target.value);
  }
  const Chevron = () => {
    return (
      <span className={styles.dropDownCustomizeSvg}>
        <SVG src={`/images/downArrow.svg`} />
      </span>
    );
  };

  useEffect(() => {
    OnleavesInfo();
    presetEmployeeInfo();
    upComingHolidays();
  }, [leavesInformation]);

  const leavesInfo = () => {
    var dataArr = []
    setLoader(true);
    if(months == ""){
      var date = new Date();
      const month = date.toLocaleString('default', { month: 'long' });
      setMonths(month); 
    }
    if(years == ""){
      setYears(new Date().getFullYear());
    }
    for(var i = 0; i < ActiveEmployeeNames.length; i++){
      fetch(`https://devbox-attendance.herokuapp.com/api/welcome/leaves/info/${months}/${years}/${ActiveEmployeeNames[i].employee_external_id}/${ActiveEmployeeNames[i].name}`)
      .then(res => res.json())
      .then(
        (response) => {
          dataArr.push(response);            
        },
        (error) => {
          console.log("error", error)
        }
        )
        }
        setTimeout(
          () => {setLeavesInformation(dataArr); setLoader(false)},
          30000
        );
        
  }

  const OnleavesInfo = () => {
    fetch(`https://devbox-attendance.herokuapp.com/api/welcome/leaves`)
      .then(res => res.json())
      .then(
        (response) => {
          setNoOfLeaves(response.onLeaves);
          setNoOfEmployees(response.activeEmployees);
          setCurrentDay(response.currentDay);
          setOpen(false);
        },
        (error) => {
          console.log("error", error)
        }
      )
  }

  const presetEmployeeInfo = () => {
    fetch(`https://devbox-attendance.herokuapp.com/api/welcome/attendances`)
      .then(res => res.json())
      .then(
        (response) => {
          setNoOfEmplPresent(response.todayAttendances);
        },
        (error) => {
          console.log("error", error)
        }
      )
  }

  const upComingHolidays = () => {
    fetch(`https://devbox-attendance.herokuapp.com/api/welcome/holidays`)
      .then(res => res.json())
      .then(
        (response) => {
          if(response){
              setholidayName(response.occasion);
              setHolidayDate(response.date);
          }
          else{
            setUpHoliday(true);
          }
        },
        (error) => {
          console.log("error", error)
        }
      )
  }

  const hoursInfo = () => {
    var hoursInfoArr = [];
    setLoaderHours(true);
    for(var i = 0; i < ActiveEmployeeNames.length; i++){
      fetch(`https://devbox-attendance.herokuapp.com/api/welcome/hours/info/${startDate}/${endDate}/${ActiveEmployeeNames[i].employee_external_id}/${ActiveEmployeeNames[i].name}`)
      .then(res => res.json())
      .then(
        (response) => {
          hoursInfoArr.push(response);            
        },
        (error) => {
          console.log("error", error)
        }
        )
        }
        setTimeout(
        () => {
          setHoursInformation(hoursInfoArr);
          setLoaderHours(false);
        },
          30000
        );
  }

  return (
    <div>
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
          <SVG className={styles.dashboardSvg} src={`/images/holidays.svg`} />
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>DASHBOARD</span>
        </div>
        <h1 className={styles.breadCrumbSpan2}>Dashboard</h1>
      </div>
      <div>
      </div>
      <Grid item xs={12}>
        <Grid container spacing={3} className={styles.gridSubItems} >
          <Grid item xs={12} sm={12} md={4}>
            <div className={`${styles.card}`} onClick={() => history.push('/leaves')}>
              <div className={`${styles.cardLeaves}`}>
                <div className={styles.cardHeaderText}>
                  On Leave
                  <SVG className={`${styles.cardSvg}`} src={`/images/leaves.svg`} />
                </div>
                <div className={` ${styles.cardBody}`}>
                  <span className={styles.cardBodyText}>{currentDay == 0 ? <span>{noOfLeaves}/{noOfEmployees}</span> : <span>{currentDay}</span>}</span>
                  <SVG className={`${styles.cardSvg}`} src={`/images/rightArrow.svg`} />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div className={styles.card} onClick={() => history.push('/employees')}>
              <div className={`${styles.cardEmployees}`}>
                <div className={styles.cardHeaderText}>
                  Present Employees
                  <SVG className={`${styles.cardSvg}`} src={`/images/people.svg`} />
                </div>
                <div className={` ${styles.cardBody}`}>
                  <span className={styles.cardBodyText}>{currentDay == 0 ? <span>{noOfEmplPresent}/{noOfEmployees}</span> : <span>{currentDay}</span>}</span>
                  <SVG className={`${styles.cardSvg}`} src={`/images/rightArrow.svg`} />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div className={`${styles.card}`} onClick={() => history.push('/holidays')}>
              <div className={`${styles.cardHolidays}`}>
                <div className={styles.cardHeaderText}>
                  Up Comming Holiday
                  <SVG className={`${styles.cardSvg}`} src={`/images/event.svg`} />
                </div>
                <div className={` ${styles.cardBody}`}>
                  {upHoliday ?
                    <span className={styles.cardBodyTextHoliday}>No Upcoming Holiday</span>
                    :
                    <div>
                      <p className={styles.holidaysInfo}>{holidayName}</p>
                      <p className={styles.holidaysInfo}>{holidayDate}</p>
                    </div>
                  }
                  <SVG className={`${styles.cardSvg}`} src={`/images/rightArrow.svg`} />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3} className={styles.gridSubItems} >
          <Grid item xs={12} sm={6}>
            <div className={styles.leaveInfoCard}>
              <div className={`${styles.cardHeader}`}>
                <h2 className="text-muted fw-normal">Leaves Information</h2>
              </div>
              <Grid item xs={12}>
                <Grid container spacing={1} className={styles.gridSubItems} >
                  <Grid item xs={12} sm={5}>
                    <div>
                      <FormControl fullWidth>
                        <TextField
                          id="months"
                          fullWidth
                          size="small"
                          label="Months"
                          variant="outlined"
                          value={months}
                          className={styles.placeholderColor}
                          onChange={handleChangeMonths}
                          disabled={loader}
                          menuprops={{ variant: "menu" }}
                          select
                          SelectProps={{ IconComponent: () => <Chevron /> }}
                        >
                          {optionsMonths.map((option, i) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <div>
                      <FormControl fullWidth>
                        <TextField
                          id="years"
                          fullWidth
                          size="small"
                          label="Years"
                          variant="outlined"
                          onChange={handleChangeYears}
                          value={years}
                          disabled={loader}
                          className={styles.placeholderColor}
                          menuprops={{ variant: "menu" }}
                          select
                          SelectProps={{ IconComponent: () => <Chevron /> }}
                        >
                          {optionsYears.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      id="leavesInfoBtn"
                      variant="contained"
                      color="primary"
                      className={styles.cardButtons}
                      onClick={leavesInfo}
                      disabled={loader}
                    >
                      {loader ? <CircularProgress /> : <span>Search</span>}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <TableContainer component={Paper} className={styles.table}>
                <Table aria-label="simple table">
                  <TableHead className={styles.tableHeader}>
                    <TableRow>
                      <TableCell className={styles.TableCell}>Employee Name</TableCell>
                      <TableCell className={styles.TableCell} >Full Leaves</TableCell>
                      <TableCell className={styles.TableCell} >Half Leaves</TableCell>
                    </TableRow>
                  </TableHead>
                  {leavesInformation.length < 1 ? 
                    <TableBody>
                      {ActiveEmployeeNames.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row" className={styles.nameCells}>
                            {row.name}
                          </TableCell>
                          <TableCell className={styles.subCells}>0</TableCell>
                          <TableCell className={styles.subCells}>0</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    : 
                    <TableBody>
                      {leavesInformation.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row" className={styles.nameCells}>
                            {row.EmplName}
                          </TableCell>
                          <TableCell className={styles.subCells}>{row.full}</TableCell>
                          <TableCell className={styles.subCells}>{row.half}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  }
                </Table>
              </TableContainer>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={styles.leaveInfoCard}>
              <div className={`${styles.cardHeader}`}>
                <h2>Hours Information</h2>
              </div>
              <Grid item xs={12}>
                <Grid container spacing={1} className={styles.gridSubItems} >
                  <Grid item xs={12} sm={5}>
                    <div>
                      <FormControl fullWidth>
                        <TextField
                          id="sDate"
                          label="Start Date"
                          type="date"
                          variant="outlined"
                          size="small"
                          value={startDate}
                          disabled={loaderHours}
                          onChange={handleChangeStartDate}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <div>
                      <FormControl fullWidth>
                        <TextField
                          id="eDate"
                          label="End Date"
                          type="date"
                          variant="outlined"
                          size="small"
                          inputProps={{
                            min:startDate ? startDate :"0000-00-00" ,
                          }}
                          value={endDate}
                          disabled={loaderHours}
                          onChange={handleChangeEndDate}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      id="hoursInfoBtn"
                      variant="contained"
                      color="primary"
                      className={styles.cardButtons}
                      onClick={hoursInfo}
                      disabled={loaderHours}
                    >
                      {loaderHours ? <CircularProgress /> : <span>Search</span>}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <TableContainer component={Paper} className={styles.table}>
                <Table aria-label="simple table">
                  <TableHead className={styles.tableHeader}>
                    <TableRow>
                      <TableCell className={styles.TableCell} >Employee Name</TableCell>
                      <TableCell className={styles.TableCell} >Time Spend</TableCell>
                    </TableRow>
                  </TableHead>
                  {hoursInformation.length < 1 ? 
                    <TableBody>
                      {ActiveEmployeeNames.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row" className={styles.nameCells}>
                            {row.name}
                          </TableCell>
                          <TableCell className={styles.subCells}>0 hours and 0 minutes</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    : 
                    <TableBody>
                      {hoursInformation.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row" className={styles.nameCells}>
                            {row.name}
                          </TableCell>
                          <TableCell className={styles.subCells}>{row.hours} hours and {row.minutes} minutes</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  }
                </Table>
              </TableContainer>
            </div>
          </Grid >
        </Grid >
      </Grid >
    </div>
  )
}
