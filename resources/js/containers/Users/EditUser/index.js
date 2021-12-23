import React, { useState, useContext, useEffect } from "react";
import styles from "./EditUser.module.scss";
import SVG from "react-inlinesvg";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { RootContext } from "../../../context/RootContext";
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useHistory } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function ManageUsers() {


  const [values, setValues] = useState({ showPassword: false, });
  const [valuesConfirm, setValuesConfirm] = useState({ showPasswordConfirm: false, });
  const { usersData, index } = useContext(RootContext);
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [isAdmin, setIsAdmin] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeConfirm = (prop) => (event) => {
    setValuesConfirm({ ...valuesConfirm, [prop]: event.target.value });
  };

  const handleClickShowPasswordConfirm = () => {
    setValuesConfirm({ ...valuesConfirm, showPasswordConfirm: !valuesConfirm.showPasswordConfirm });
  };

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };


  useEffect(() => {
    var userDataForEdit = usersData[index]
    setName(userDataForEdit.name)
    setUsername(userDataForEdit.username)
  }, []);

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const nameChange = (event) => {
    setName(event.target.value)
  }

  const isAdminCheck = (event) => {
    setIsAdmin(event.currentTarget.checked);
  }

  const editUser = () =>{
    setOpen(true);
    var today = new Date()
    var password = values.password;
    var confirmPass = valuesConfirm.password;
    if(password == confirmPass){
      fetch(`https://devbox-attendance.herokuapp.com/api/user/update/${usersData[index].id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            is_admin: isAdmin,
            created_at: today,
            updated_at: today,
            name: name
        })
      })
      .then(response => response.json())
      .then(data => {
        history.push('/users/new')
        setOpen(false);
        console.log('Success:', data);
      })
      .catch((error) => {
        setOpen(false);
        console.error('Error:', error);
      });
    }
    else{
      setOpen(false);
      alert('Passwords must be same');
    }
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
          <span className={styles.breadCrumbsSpan}>User</span>
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>Edit</span>
        </div>
        <h1 className={styles.breadCrumbSpan2}>Edit User</h1>
      </div>
      <div className={styles.mainCard}>
        <div className={styles.flex}>
          <h2 className={styles.createHeading}>Edit User Information</h2>
        </div>

        <Grid item xs={12}>
          <Grid container spacing={1} className={styles.gridSubItems} >
            <Grid item xs={12} sm={4} className={styles.fieldGrid}>
              <FormControl fullWidth >
                <TextField
                  className={styles.fieldDiv}
                  id="EditUserInformation_email"
                  label="User Name"
                  type="email"
                  variant="outlined"
                  size="small"
                  placeholder="Enter Your Email"
                  value={username}
                  onChange={usernameChange}
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
                  id="EditUserInformation_name"
                  label="Name"
                  type="email"
                  variant="outlined"
                  size="small"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={nameChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} className={styles.gridSubItems} >
            <Grid item xs={12} sm={4} className={styles.fieldGrid}>

              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  className={styles.fieldDiv}
                  id="EditUserInformation_password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} className={styles.gridSubItems} >
            <Grid item xs={12} sm={4} className={styles.fieldGrid}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <OutlinedInput
                  className={styles.fieldDiv}
                  id="EditUserInformation_confirmPassword"
                  type={valuesConfirm.showPasswordConfirm ? 'text' : 'password'}
                  value={valuesConfirm.password}
                  onChange={handleChangeConfirm('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPasswordConfirm}
                        edge="end"
                      >
                        {valuesConfirm.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={150}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} className={styles.gridSubItems} >
            <Grid item xs={12} sm={4} className={styles.fieldGrid}>
              <FormControl >
                <FormControlLabel
                  id="EditUserInformation_ifAdmin"
                  className={styles.satSunCheckbox}
                  value="start"
                  control={<Checkbox color="primary" />}
                  label="Check if admin"
                  labelPlacement="end"
                  onChange={isAdminCheck}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} className={styles.gridSubItems} >
            <Grid item xs={12} sm={4} className={styles.fieldGrid}>
              <Button id="EditUserInformation_update" onClick={editUser} variant="contained" color="primary" className={styles.saveButton}>
                Update
              </Button>
              <Button id="EditUserInformation_cancel" onClick={() => {history.push('/users/new')}} size="small" variant="contained" color="default">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>

    </>
  );
}
