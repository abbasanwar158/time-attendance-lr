import React, { useState, useContext, useEffect } from "react";
import styles from "./EditEmployeeStatus.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RootContext } from "../../../context/RootContext";
import { useHistory } from "react-router-dom";

export default function EditEmployeeStatus() {

  const { ActiveEmployeeNames } = useContext(RootContext);
  const [selected, setSelected] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const history = useHistory();

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setSelectedStatus(event.target.value);
  };
  const Chevron = () => {
    return (
      <span className={styles.dropDownCustomizeSvg}>
        <SVG src={`/images/downArrow.svg`} />
      </span>
    );
  };

  const statusUpdate = () => {
    fetch(`https://time-attendance-lr.herokuapp.com/api/employee/edit_status/${selected}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          active: selectedStatus,
        })
      })
      .then(response => response.json())
      .then(data => {
        history.push('/employees')
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
          <span className={styles.breadCrumbsSpan}>Employees</span>
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>Edit</span>
        </div>
        <h1 className={styles.breadCrumbSpan2}>Edit Employee Status</h1>
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
                      <MenuItem key={option.name} value={option.id}>
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
                    <MenuItem value="1">
                      Active
                    </MenuItem>
                    <MenuItem value="0">
                      Not Active
                    </MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} className={styles.gridSubItems} >
              <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                <Button onClick={statusUpdate} variant="contained" color="primary" className={styles.saveButton}>
                  Update
                </Button>
                <Button
                 variant="contained" 
                 color="default"
                 onClick={(e) => history.push('/employees')}
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
