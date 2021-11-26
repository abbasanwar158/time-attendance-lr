import React, { useState, useContext, useEffect } from "react";
import styles from "./EditAttendance.module.scss";
import SVG from "react-inlinesvg";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RootContext } from "../../../context/RootContext";
import { useHistory } from "react-router-dom";

export default function ManageAttendance() {

  const { attendanceData, index } = useContext(RootContext);
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [date, setDate] = useState('')
  const [attendanceId, setAttendanceId] = useState('')
  const [employeeName, setEmployeeName] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const history = useHistory();

  const dateFun = (event) => {
    setDate(event.target.value)
  }

  const checkinFun = (event) => {
    setCheckin(event.target.value)
  }

  const checkoutFun = (event) => {
    setCheckout(event.target.value)
  }

  const EditAttendance = () => {
    var checkinFinal = date + ' ' + checkin;
    var checkoutFinal = date + ' ' + checkout;
    var today = new Date()
    fetch(`https://time-attendance-lr.herokuapp.com/api/attendance/update/${index}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          EmployeeId: employeeId,
          Date: date,
          CheckIn: checkinFinal,
          CheckOut: checkoutFinal,
          CreatedDate: createdAt,
          ModifyDate: today
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        history.push('/attendance/new')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetch(`https://time-attendance-lr.herokuapp.com/api/attendance/${index}`)
      .then(res => res.json())
      .then(
        (response) => {
          setEmployeeName(response[0].name)
          setEmployeeId(response[0].employee_external_id)
          setAttendanceId(response[0].id)
          setDate(response[0].date)
          setCheckin(response[0].checkin.split(' ')[1])
          setCheckout(response[0].checkout.split(' ')[1])
          setCreatedAt(response[0].created_at)
        },
        (error) => {
          console.log("error", error)
        }
      )
  }, []);

  return (
    <>
      <div className={styles.breadCrumbsContainer}>
        <div className={styles.breadCrumbsSubContainer}>
          <SVG className={styles.dashboardSvg} src={`/images/holidays.svg`} />
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>Attendance</span>
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>edit</span>
        </div>
        <h1 className={styles.breadCrumbSpan2}>Edit Attendance</h1>
      </div>
      <div className={styles.mainCard}>



        <Grid item xs={12}>
          <Grid container spacing={1} className={styles.gridSubItems} >
            <Grid item xs={12} sm={4} className={styles.fieldGrid}>
              <h3 className={styles.employeeInfo}>{employeeName} ({employeeId})</h3>
            </Grid>
          </Grid>
        </Grid>




        <Grid item xs={12}>
          <Grid container spacing={1} className={styles.gridSubItems} >
            <Grid item xs={12} sm={4} className={styles.fieldGrid}>
              <FormControl fullWidth >
                <TextField
                  className={styles.fieldDiv}
                  id="date"
                  label="DATE"
                  type="date"
                  variant="outlined"
                  defaultValue="2021-07-29"
                  size="small"
                  value={date}
                  onChange={dateFun}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} className={styles.gridSubItems} >
            <Grid item xs={12} sm={4} className={styles.fieldGrid}>
              <FormControl fullWidth>
                <TextField
                  className={styles.fieldDiv}
                  id="date"
                  label="CHECKIN"
                  type="time"
                  variant="outlined"
                  size="small"
                  defaultValue={checkin}
                  value={checkin}
                  onChange={checkinFun}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} className={styles.gridSubItems} >
            <Grid item xs={12} sm={4} className={styles.fieldGrid}>
              <FormControl fullWidth>
                <TextField
                  className={styles.fieldDiv}
                  id="date"
                  label="CHECKOUT"
                  type="time"
                  variant="outlined"
                  defaultValue={checkout}
                  size="small"
                  value={checkout}
                  onChange={checkoutFun}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} className={styles.gridSubItems} >
            <Grid item xs={12} sm={4} className={styles.fieldGrid}>
              <Button
                variant="contained"
                color="primary"
                className={styles.saveButton}
                onClick={EditAttendance}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="default"
                onClick={() => history.push('/attendance/new')}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>

    </>
  );
}
