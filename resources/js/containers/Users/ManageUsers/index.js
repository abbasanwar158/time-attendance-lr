import React, { useState, useContext, useEffect } from "react";
import styles from "./ManageUsers.module.scss";
import SVG from "react-inlinesvg";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { RootContext } from "../../../context/RootContext";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useHistory } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});


export default function ManageUsers() {


  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [values, setValues] = useState({ showPassword: false, });
  const [valuesConfirm, setValuesConfirm] = useState({ showPasswordConfirm: false, });
  const { usersData, setUsersData, setIndex } = useContext(RootContext);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const nameChange = (event) => {
    setName(event.target.value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    getUserData();
  }, []);

  const getUserData = () => {
    setOpen(true);
    var usersArr = [];
    fetch("https://devbox-attendance.herokuapp.com/api/users")
      .then(res => res.json())
      .then(
        (response) => {
          var data = response
          for (var i = 0; i < data.length; i++) {
            usersArr.push(data[i])
          }
          setUsersData(usersArr);
          setOpen(false);
        },
        (error) => {
          setOpen(false);
          console.log("error", error)
        }
      )
  }

  const deleteData = (e) => {
    setOpen(true);
    var userId = e.target.value
    fetch(`https://devbox-attendance.herokuapp.com/api/user/delete/${userId}`, { method: 'DELETE' })
      .then(() => alert('Delete successful'), setOpen(false));
    getUserData();
  }

  const isAdminCheck = (event) => {
      setIsAdmin(event.currentTarget.checked);
  }

  const newUser = () => {
    setOpen(true);
    var today = new Date()
    var password = values.password;
    var confirmPass = valuesConfirm.password;
    if(password == confirmPass){
      fetch('https://devbox-attendance.herokuapp.com/api/user/new', {
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
        setOpen(false);
        console.log('Success:', data);
      })
      .catch((error) => {
        setOpen(false);
        console.error('Error:', error);
      });
      getUserData();
    }
    else{
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
          <SVG className={styles.dashboardSvg} src="" />
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>Users</span>
        </div>
        <h1 className={styles.breadCrumbSpan2}>Manage Users</h1>
      </div>
      <div className={styles.mainCard}>
        <div className={styles.flex}>
          <h2 className={styles.createHeading}>Create New Account</h2>
        </div>

        <Grid item xs={12}>
          <Grid container spacing={1} className={styles.gridSubItems} >
            <Grid item xs={12} sm={4} className={styles.fieldGrid}>
              <FormControl fullWidth >
                <TextField
                  className={styles.fieldDiv}
                  id="CreateNewAccount_email"
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
                  id="CreateNewAccount_name"
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
                  id="CreateNewAccount_password"
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
                  id="CreateNewAccount_confirmPassword"
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
                  id="CreateNewAccount_ifAdmin"
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
              <Button id="CreateNewAccount_register" onClick={newUser} variant="contained" color="primary" className={styles.saveButton}>
                Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <div className={styles.flex}>
          <TableContainer component={Paper} className={styles.table}>
            <Table className={classes.table} aria-label="custom pagination table">
              <TableHead className={styles.tableHeader}>
                <TableRow>
                  <TableCell className={styles.TableCell}>Username</TableCell>
                  <TableCell className={styles.TableCell} >Is Admin</TableCell>
                  <TableCell className={styles.TableCell} >Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? usersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : usersData
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className={styles.nameCells}>{row.username}</TableCell>
                    <TableCell className={styles.subCells}>{row.is_admin ? 'true' : 'false'}</TableCell>
                    <TableCell className={styles.subCells}>
                      <button
                        value={row.id}
                        onClick={(e) => {
                          var userId = e.target.value
                          for (var i = 0; i < usersData.length; i++) {
                            var tempId = usersData[i].id
                            if (tempId == userId) {
                              setIndex(i);
                            }
                          }
                          history.push('/user/edit')
                        }}
                      >Edit
                      </button>
                      |
                      <button
                        value={row.id}
                        className={styles.deleteBtn}
                        onClick={deleteData}
                      >Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    className={styles.pagginationContainer}
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={6}
                    count={usersData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </div>

    </>
  );
}
