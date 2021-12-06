import React, { useState, useContext, useEffect } from "react";
import styles from "./Login.module.scss";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { useHistory, withRouter,Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { RootContext } from "../../context/RootContext";
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';

export default function Login() {
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [username, setUsername] = useState('')
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const { setLoginNavbar } = useContext(RootContext);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const usenameFun = (event) => {
    setUsername(event.target.value)
  }

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      loginUser();
    }
  };

  const loginUser = () => {
    setOpen(true);
    fetch(`https://time-attendance-lr.herokuapp.com/api/user/login/${username}/${values.password}`)
      .then(res => res.json())
      .then(
        (response) => {
          if (response.id) {
            setAlert(false);
            setLoginNavbar(true);
            localStorage.setItem('name', response.name)
            localStorage.setItem('userId', response.id)
            localStorage.setItem('username', response.username)
            setTimeout(
              () => { setOpen(false); history.push('/dashboard')},
              1500
            );

            if (response.is_admin) {
              localStorage.setItem('isAdmin', 'true')
            }
            else {
              localStorage.setItem('isAdmin', 'false')
            }
          }
          else {
            setOpen(false);
            setAlert(true);
          }
        },
        (error) => {
          setAlert(true);
          setOpen(false);
          console.log("error", error)
        }
      )
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
    {alert ? <Alert severity="error" open={alert}>Wrong Password or Username!</Alert> : null }
      <div className={styles.flexContainer}>
        <div className={styles.container}>
          <div className={styles.flex}>
            <h4 className={styles.heading}>Login to access your Account</h4>
          </div>
          <div className={styles.mainDiv}>
            <p className={styles.textP}> User name </p>
            <TextField
              className={styles.fieldsWidth}
              id="outlined-basic-email"
              label="Email"
              type="text"
              variant="outlined"
              value={username}
              onChange={usenameFun}
              onKeyDown={handleKeypress}
            />
            <p className={styles.textP}> Password </p>
            <FormControl variant="outlined" className={styles.fieldsWidth}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                onKeyDown={handleKeypress}
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
            <Button
              className={styles.loginButton}
              onClick={loginUser}
              variant="contained"
              color="primary"
              disabled={loader}
            >
              {loader ? <CircularProgress /> : <span>Login</span>}
            </Button>

            <div className={styles.resetAnchor}>
              <Link to="/reset">Reset Password</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
