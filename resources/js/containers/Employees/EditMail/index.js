import React, { useState, useContext, useEffect } from "react";
import styles from "./EditMail.module.scss";
import SVG from "react-inlinesvg";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";


export default function EditMail() {

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  return (
      <>
        <div className={styles.breadCrumbsContainer}>
          <div className={styles.breadCrumbsSubContainer}>
            <SVG
              className={styles.dashboardSvg}
              src={`/images/holidays.svg`}
            />
            <span className={styles.breadCrumbsSlash}>/</span>
            <span className={styles.breadCrumbsSpan}>Email to employee</span>
            <span className={styles.breadCrumbsSlash}>/</span>
            <span className={styles.breadCrumbsSpan}>Edit</span>
          </div>
          <h1 className={styles.breadCrumbSpan2}>Edit Email for Employees</h1>
        </div>

        <div className={styles.mainCard}>
          <div className={styles.gridContainer}>
            <Grid item xs={12}>
              <Grid container spacing={1} className={styles.gridSubItems} >
                <Grid item xs={12} sm={12} className={styles.fieldGrid} >
                  <FormControl fullWidth>
                    <TextField
                      id="subject"
                      label="Subject"
                      type="text"
                      value={subject}
                      onChange={(e) =>
                          setSubject(e.target.value)
                      }
                      variant="outlined"
                      size="small"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} className={styles.fieldGrid} >
                  <FormControl fullWidth>
                    <TextField
                      id="message"
                      label="Message"
                      multiline
                      rows={4}
                      value={message}
                      onChange={(e) =>
                          setMessage(e.target.value)
                      }
                      variant="outlined"
                      placeholder="Enter your message here......."
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} className={styles.fieldGrid} >
                  <Button
                    id="save"
                    variant="contained"
                    color="primary"
                    className={styles.applyButton}
                  >
                    Send
                  </Button>
                  <Button id="cancel" onClick={() => {history.push('/employees/mail')}} variant="contained" color="default">
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
