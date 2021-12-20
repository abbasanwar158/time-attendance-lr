import React, { useState, useContext, useEffect } from "react";
import styles from "./Navbar.module.scss";
import SVG from "react-inlinesvg";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Sidebar from "../Sidebar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import { RootContext } from "../../context/RootContext";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Navbar() {

  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false)
  const [anchorEl, setMenu] = useState(null);
  const history = useHistory();
  const { loginNavbar, noOfLeaves } = useContext(RootContext);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };


  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <img
            className={styles.logo}
            width="150px"
            src={`/images/logo.png`}
            onClick={() => {history.push('/dashboard')}}
          />
        </div>
        {localStorage.getItem('username') != null ?
        <div className={styles.mlAuto}>
          <SVG className={styles.userMenuBtn} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} src={`/images/profile.svg`} /> 
          {localStorage.isAdmin == 'true' ? <span>{noOfLeaves > 0 ? <span className={styles.blink_me}></span> : null}</span>: null}
        </div>
        : null}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          className={styles.menuPosition}
          >
          {localStorage.isAdmin == 'true' ? 
            <MenuItem
              onClick={() => {
                handleCloseMenu()
                history.push('/users/new')
              }}
            >
              <SVG className={styles.subMenuIcons} src={`/images/people.svg`} />
              <span className={styles.subMenuSpan}>Manage Users</span>
            </MenuItem>
          : null}

          {localStorage.isAdmin == 'true' ? 
            <MenuItem
              onClick={() => {
                handleCloseMenu()
                history.push('/employees/review_date')
              }}
            >
              <SVG className={styles.subMenuIcons} src={`/images/dateRange.svg`} />
              <span className={styles.subMenuSpan}>Employee Review Date</span>
            </MenuItem>
          : null}

          {localStorage.isAdmin == 'true' ?
            <MenuItem
              onClick={() => {
                handleCloseMenu()
                history.push('/employees/report')
              }}>
              <SVG className={styles.subMenuIcons} src={`/images/timer.svg`} />
              <span className={styles.subMenuSpan}>Employee Reports</span>
            </MenuItem>
          : null}

          {localStorage.isAdmin == 'true' ?
            <div className={styles.relative}>
                <MenuItem
                  onClick={() => {
                    handleCloseMenu()
                    history.push('/leaves/requests')
                  }}>
                  <SVG className={styles.subMenuIcons} src={`/images/assignment.svg`} />
                  <span className={styles.subMenuSpan}>Leave Requests</span>
                </MenuItem>
                {noOfLeaves > 0 ? <span className={styles.noOfleaves}>{noOfLeaves}</span> : null}
            </div>
          : null}

          {/* <MenuItem
            onClick={() => {
              handleCloseMenu()
              history.push('/employees/performance_form')
            }}>
            <SVG className={styles.subMenuIcons} src={`/images/assessment.svg`} />
            <span className={styles.subMenuSpan}>Employee Performace Form</span>
          </MenuItem> */}

          {localStorage.isAdmin == 'true' ?
            <MenuItem
              onClick={() => {
                handleCloseMenu()
                history.push('/employees/mail')
              }}>
              <SVG className={styles.subMenuIcons} src={`/images/mail.svg`} />
              <span className={styles.subMenuSpan}>Mail to all employees</span>
            </MenuItem>
          : null}

            <MenuItem
              onClick={() => {
                handleCloseMenu()
                history.push('/change_password')
              }}
            >
              <SVG className={styles.subMenuIcons} src={`/images/change-password.svg`} />
              <span className={styles.subMenuSpan}>Change Password</span>
            </MenuItem>

          <MenuItem
            onClick={() => {
              handleCloseMenu()
              localStorage.removeItem('username')
              localStorage.removeItem('isAdmin')
              history.push('/login')
            }}>
            <SVG className={styles.subMenuIcons} src={`/images/lock.svg`} />
            <span className={styles.subMenuSpan}>Logout</span>
          </MenuItem>

        </Menu>
        <SVG className={styles.sidebarToggleBtn} onClick={handleClickOpen} src={`/images/sidebartoggle.svg`} />
      </div>

      <div>
        <Dialog fullScreen open={modalOpen} className={styles.sidebar} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Sidebar
              </Typography>
            </Toolbar>
          </AppBar>
          <Sidebar fromNavbar={true} setModalOpen={setModalOpen} />
        </Dialog>
      </div>
    </>

  );
}