import React, { useState, useContext, useEffect } from "react";
import styles from "./NewLeave.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RootContext } from "../../../context/RootContext";
import { useHistory } from "react-router-dom";
import { WbSunny } from "@material-ui/icons";

export default function NewLeave() {

  const { ActiveEmployeeNames } = useContext(RootContext);
  const [selected, setSelected] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedNote, setSelectedNote] = useState('')
  const [selectedTime, setSelectedTime] = useState('00:00:00')
  const [selectedStatus, setSelectedStatus] = useState('')
  const history = useHistory();

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleChangeNote = (event) => {
    setSelectedNote(event.target.value);
  };
  

  const Chevron = () => {
    return (
      <span className={styles.dropDownCustomizeSvg}>
        <SVG src={`/images/downArrow.svg`} />
      </span>
    );
  };

  // const newattendance = () => {
  //   var today = new Date()
  //   if(selectedStatus == 'half'){
  //     setTime('04:30:00');
  //   }
  //   debugger
  //   fetch('https://time-attendance-lr.herokuapp.com/api/leave/new', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         employee_id: selected,
  //         date: date,
  //         status: selectedStatus,
  //         note: note,
  //         time: time,
  //         created_at: today,
  //         updated_at: today
  //       })
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Success:', data);
  //       history.push('/leaves');
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });

  // }


  const newattendance = () => {
    var today = new Date()
    fetch('https://time-attendance-lr.herokuapp.com/api/leave/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employee_id: selected,
          date: selectedDate,
          status: selectedStatus,
          created_at: today,
          updated_at: today,
          note: selectedNote,
          time: selectedTime,
        })
      })
      .then(response => response.json())
      .then(data => {
        debugger
        console.log('Success:', data);
      })
      .catch((error) => {
        debugger
        console.error('Error:', error);
      });
      debugger
  }


  return (
    <>
      <div className={styles.breadCrumbsContainer}>
        <div className={styles.breadCrumbsSubContainer}>
          <SVG className={styles.dashboardSvg} src={`/images/holidays.svg`} />
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>Leave</span>
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>New Leave</span>
        </div>
        <h1 className={styles.breadCrumbSpan2}>Add New Leave</h1>
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
                    value={selected}
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
                    size="small"
                    value={selectedDate}
                    onChange={handleChangeDate}
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
                    value={selectedStatus}
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
                    value={selectedNote}
                    onChange={handleChangeNote}
                  >
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} className={styles.gridSubItems} >
              <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                <Button variant="contained" color="primary" onClick={newattendance} className={styles.saveButton}>
                  Save
                </Button>
                <Button
                  onClick={(e) => history.push('/leaves')} 
                  variant="contained" 
                  color="default"
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
