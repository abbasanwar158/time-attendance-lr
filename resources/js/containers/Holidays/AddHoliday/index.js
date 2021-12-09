import React, { useState, useContext, useEffect } from "react";
import styles from "./AddHoliday.module.scss";
import SVG from "react-inlinesvg";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AddHoliday() {

  const history = useHistory();
  const [date, setDate] = useState('');
  const [occasion, setOccasion] = useState('');
  const [open, setOpen] = useState(false);

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  }

  const handleChangeOccasion = (event) => {
    setOccasion(event.target.value);
  }

  const newHoliday = () => {
    setOpen(true);
    var today = new Date()
    fetch(`https://time-attendance-lr.herokuapp.com/api/holiday/new`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: date,
          occasion: occasion,
          created_at: today,
          updated_at: today
        })
      })
      .then(response => response.json())
      .then(data => {
        setOpen(false);
        console.log('Success:', data);
        history.push('/holidays');
      })
      .catch((error) => {
        setOpen(false);
        console.error('Error:', error);
      });
  }

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
          <SVG className={styles.dashboardSvg} src={`/images/holidays.svg`} />
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>Holiday</span>
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>New Holiday</span>
        </div>
        <h1 className={styles.breadCrumbSpan2}>Add New Holiday </h1>
      </div>
      <div className={styles.mainCard}>
        <div className={styles.gridContainer}>
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
                    value={date}
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
                <a target="_blank" href="https://www.officeholidays.com/countries/pakistan/">
                  <Button variant="contained" color="primary" className={styles.holidaysBtn} >
                    National Holidays
                  </Button>
                </a>
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
                    label="Occasion"
                    type="text"
                    variant="outlined"
                    value={occasion}
                    onChange={handleChangeOccasion}
                  >
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} className={styles.gridSubItems} >
              <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                <Button onClick={newHoliday} size="small" variant="contained" color="primary" className={styles.uploadButton}>
                  Save
                </Button>
                <Button onClick={() => {history.push('/holidays')}} size="small" variant="contained" color="default">
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
