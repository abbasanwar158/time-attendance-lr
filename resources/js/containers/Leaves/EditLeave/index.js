import React, { useState, useContext, useEffect } from "react";
import styles from "./EditLeave.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RootContext } from "../../../context/RootContext";
import { useHistory } from "react-router-dom";


export default function EditLeave() {

  const { ActiveEmployeeNames, leavesData, index } = useContext(RootContext);
  const [employee, setEmployee] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [note, setNote] = useState('')
  const [selectedTime, setSelectedTime] = useState('00:00:00')
  const history = useHistory();


  const handleChange = (event) => {
    setEmployee(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const handleChangeNote = (event) => {
    setNote(event.target.value);
  };

  const Chevron = () => {
    return (
      <span className={styles.dropDownCustomizeSvg}>
        <SVG src={`/images/downArrow.svg`} />
      </span>
    );
  };

  useEffect(() => {
    var leaveDataForEdit = leavesData[index]
    setEmployee(leaveDataForEdit.employee_external_id)
    setDate(leaveDataForEdit.date)
    setStatus(leaveDataForEdit.status)
    setNote(leaveDataForEdit.note)
  }, []);

  const updateLeave = () => {
    var today = new Date()
    fetch(`https://time-attendance-lr.herokuapp.com/api/leave/update/${leavesData[index].id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employee_id: employee,
          date: date,
          status: status,
          created_at: today,
          updated_at: today,
          note: note,
          time: selectedTime,
        })
      })
      .then(response => response.json())
      .then(data => {
        history.push('/leaves');
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <div className={styles.breadCrumbsContainer}>
        <div className={styles.breadCrumbsSubContainer}>
          <SVG className={styles.dashboardSvg} src={`/images/holidays.svg`} />
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>Leave</span>
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>Edit leave </span>
        </div>
        <h1 className={styles.breadCrumbSpan2}>Edit Leave </h1>
      </div>
      <div className={styles.mainCard}>
        <div className={styles.gridContainer}>
          <Grid item xs={12}>
            <Grid container spacing={1} className={styles.gridSubItems} >
              <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                <FormControl fullWidth >
                  <TextField
                    className={styles.fieldDiv}
                    id="questions"
                    fullWidth
                    size="small"
                    label="Employee"
                    variant="outlined"
                    value={employee}
                    onChange={handleChange}
                    menuprops={{ variant: "menu" }}
                    select
                    SelectProps={{ IconComponent: () => <Chevron /> }}
                  >
                    {ActiveEmployeeNames.map((option) => (
                      <MenuItem key={option.name} value={option.employee_external_id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    label="Date"
                    type="date"
                    variant="outlined"
                    value={date}
                    onChange={handleChangeDate}
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
            <Grid container spacing={1} className={styles.gridSubItems} >
              <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                <FormControl fullWidth >
                  <TextField
                    className={styles.fieldDiv}
                    id="questions"
                    fullWidth
                    size="small"
                    label="Status"
                    variant="outlined"
                    value={status}
                    onChange={handleChangeStatus}
                    menuprops={{ variant: "menu" }}
                    select
                    SelectProps={{ IconComponent: () => <Chevron /> }}
                  >
                    <MenuItem value="Half">
                      Half
                    </MenuItem>
                    <MenuItem value="Full">
                      Full
                    </MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} className={styles.gridSubItems} >
              <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                <FormControl fullWidth >
                  <TextField
                    className={styles.fieldDiv}
                    id="questions"
                    fullWidth
                    size="small"
                    label="Note"
                    type="text"
                    variant="outlined"
                    onChange={handleChangeNote}
                    value={note}
                  >
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} className={styles.gridSubItems} >
              <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                <Button onClick={updateLeave} variant="contained" color="primary" className={styles.saveButton}>
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  onClick={(e) => history.push('/leaves')}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>

    </>
  );
}
