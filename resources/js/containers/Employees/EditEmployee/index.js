import React, { useState, useContext, useEffect } from "react";
import styles from "./EditEmployee.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RootContext } from "../../../context/RootContext";
import { useHistory } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function NewEmployee() {

  const { employeesData, index } = useContext(RootContext);
  const [externalId, setExternalId] = useState('')
  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [cnic, setCnic] = useState('')
  const [email, setEmail] = useState('')
  const [joiningDate, setJoiningDate] = useState('')
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')
  const [employeeCat, setEmployeeCat] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
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

  useEffect(() => {
    var employeeDataForEdit = employeesData[index]
    setExternalId(employeeDataForEdit.employee_external_id)
    setName(employeeDataForEdit.name)
    setDesignation(employeeDataForEdit.designation)
    setCnic(employeeDataForEdit.cnic)
    setEmail(employeeDataForEdit.email)
    setJoiningDate(employeeDataForEdit.joining_date)
    setEmployeeCat(employeeDataForEdit.employees_category)
    setDescription(employeeDataForEdit.description)
    var statusValue = employeeDataForEdit.active
    if (statusValue) {
      setStatus(1)
    }
    else {
      setStatus(0)
    }
  }, []);

  const editEmployee = () => {
    setOpen(true);
    var today = new Date()
    fetch(`https://time-attendance-lr.herokuapp.com/api/employee/update/${employeesData[index].id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employee_external_id: externalId,
          name: name,
          active: status,
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
        history.push('/employees');
        console.log('Success:', data);
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
          <span className={styles.breadCrumbsSpan}>Employees</span>
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>Edit</span>
        </div>
        <h1 className={styles.breadCrumbSpan2}>Edit Employee</h1>
      </div>
      <div className={styles.mainCard}>
        <div className={styles.gridContainer}>
          <Grid item xs={12}>
            <Grid container spacing={1} className={styles.gridSubItems} >
              <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                <FormControl fullWidth >
                  <TextField
                    className={styles.fieldDiv}
                    id="edit_employee_external"
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
                    id="edit_employee_name"
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
                    id="edit_employee_designation"
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
                    id="edit_employee_cnic"
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
                    id="edit_employee_email"
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
                    id="edit_employee_jDate"
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
                    id="edit_employee_description"
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
                    id="edit_employee_category"
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
                    id="edit_employee_status"
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
                <Button id="edit_employee_update" onClick={editEmployee} variant="contained" color="primary" className={styles.saveButton}>
                  Update
                </Button>
                <Button
                  id="edit_employee_cancel"
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
