import React, { useState, useContext, useEffect } from "react";
import styles from "./EditRequest.module.scss";
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

export default function EditRequest() {

  const { replyLeave, index } = useContext(RootContext);
  const [status, setStatus] = useState('')
  const [note, setNote] = useState('')
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
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
    var data = replyLeave[index];
    setStatus(data.reply_status)
    setNote(data.reply)
  }, []);

  const updateLeave = () => {
    setOpen(true);
    var today = new Date()
    fetch(`https://time-attendance-lr.herokuapp.com/api/leave/requests/reply/${replyLeave[index].id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reply: note,
          replyStatus: status,
          created_at: today,
          updated_at: today,
        })
      })
      .then(response => response.json())
      .then(data => {
        setOpen(false);
        history.push('/leaves/requests');
        console.log('Success:', data);
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
          <span className={styles.breadCrumbsSpan}>Leave</span>
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>Request </span>
          <span className={styles.breadCrumbsSlash}>/</span>
          <span className={styles.breadCrumbsSpan}>Edit </span>
        </div>
        <h1 className={styles.breadCrumbSpan2}>Leave Request Edit </h1>
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
                    label="Status"
                    variant="outlined"
                    value={status}
                    onChange={handleChangeStatus}
                    menuprops={{ variant: "menu" }}
                    select
                    SelectProps={{ IconComponent: () => <Chevron /> }}
                  >
                    <MenuItem value="Approved">
                      Approved
                    </MenuItem>
                    <MenuItem value="Not Approved">
                      Not Approved
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
                    label="Message"
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
                  onClick={(e) => history.push('/leaves/requests')}
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
