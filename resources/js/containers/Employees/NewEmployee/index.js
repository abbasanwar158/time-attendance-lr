import React, { useState, useContext, useEffect } from "react";
import styles from "./NewEmployee.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function NewEmployee() {

  const [selectedStatus, setSelectedStatus] = useState('');
  const [externalId, setExternalId] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [cnic, setCnic] = useState('');
  const [email, setEmail] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [description, setDescription] = useState('');
  const [employeeCat, setEmployeeCat] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleChangeStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleChangeExId = (event) => {
    setExternalId(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDesignation = (event) => {
    setDesignation(event.target.value);
  };

  const handleChangeCnic = (event) => {
    setCnic(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeDate = (event) => {
    setJoiningDate(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeEmployeeCat = (event) => {
    setEmployeeCat(event.target.value);
  }

  const Chevron = () => {
    return (
      <span className={styles.dropDownCustomizeSvg}>
        <SVG src={`/images/downArrow.svg`} />
      </span>
    );
  };

  const newEmployee = () => {
    setOpen(true);
    var today = new Date()
    fetch('https://devbox-attendance.herokuapp.com/api/employee/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employee_external_id: externalId,
          name: name,
          active: selectedStatus,
          created_at: today,
          updated_at: today,
          cnic: cnic,
          email: email,
          employee_cat: employeeCat,
          designation: designation,
          joining_date: joiningDate,
          description: description,
        })
      })
      .then(response => response.json())
      .then(data => {
        setOpen(false);
        console.log('Success:', data);
        history.push('/employees');
      })
      .catch((error) => {
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
          <span className={styles.breadCrumbsSpan}>Employee</span>
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>New Employee</span>
        </div>
        <h1 className={styles.breadCrumbSpan2}>Add New Employee</h1>
      </div>
      <div className={styles.mainCard}>
        <div className={styles.gridContainer}>
          <Grid item xs={12}>
            <Grid container spacing={1} className={styles.gridSubItems} >
              <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                <FormControl fullWidth >
                  <TextField
                    className={styles.fieldDiv}
                    id="externalId"
                    fullWidth
                    size="small"
                    label="Employee external"
                    type="number"
                    variant="outlined"
                    value={externalId}
                    onChange={handleChangeExId}
                  >
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
                    id="name"
                    fullWidth
                    size="small"
                    label="Name"
                    type="text"
                    variant="outlined"
                    value={name}
                    onChange={handleChangeName}
                  >
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
                    id="designation"
                    fullWidth
                    size="small"
                    label="Designation"
                    type="text"
                    variant="outlined"
                    value={designation}
                    onChange={handleChangeDesignation}
                  >
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
                    id="cnic"
                    fullWidth
                    size="small"
                    label="CNIC"
                    type="text"
                    variant="outlined"
                    value={cnic}
                    onChange={handleChangeCnic}
                  >
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
                    id="email"
                    fullWidth
                    size="small"
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={handleChangeEmail}
                  >
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
                    id="jDate"
                    label="Joining Date"
                    type="date"
                    variant="outlined"
                    defaultValue="2021-01-01"
                    size="small"
                    value={joiningDate}
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
                    id="description"
                    fullWidth
                    size="small"
                    label="Description"
                    type="text"
                    variant="outlined"
                    value={description}
                    onChange={handleChangeDescription}
                  >
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
                    id="category"
                    fullWidth
                    size="small"
                    label="Category"
                    variant="outlined"
                    value={employeeCat}
                    onChange={handleChangeEmployeeCat}
                    menuprops={{ variant: "menu" }}
                    select
                    SelectProps={{ IconComponent: () => <Chevron /> }}
                  >
                    <MenuItem value="Permanent">
                      Permanent
                    </MenuItem>
                    <MenuItem value="Internees">
                      Internees
                    </MenuItem>
                    <MenuItem value="Outside Contact">
                      Outside Contact
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
                    id="status"
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
                <Button id="save" onClick={newEmployee} variant="contained" color="primary" className={styles.saveButton}>
                  Save
                </Button>
                <Button id="cancel" onClick={(e) => history.push('/employees')} variant="contained" color="default">
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
