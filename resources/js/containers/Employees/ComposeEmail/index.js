import React, { useState, useContext, useEffect } from "react";
import styles from "./ComposeEmail.module.scss";
import SVG from "react-inlinesvg";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ComposeEmail() {

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const mailToAll = () => {
      setOpen(true);
      fetch(`https://devbox-attendance.herokuapp.com/api/employees/mail/new`, {
          method: "POST",
          // mode: "no-cors",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
              subject: subject,
              message: message,
          }),
      })
          .then((response) => response.text())
          .then((data) => {
              setOpen(false);
              console.log("Success:", data);
              history.push("/employees/mail");
          })
          .catch((error) => {
              setOpen(false);
              console.error("Error:", error);
          });
  };

  return (
      <>
          <div className={styles.backDropZindex}>
              <Backdrop
                  sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
              >
                  <CircularProgress color="primary" />
                  <span className={styles.loadingText}>Loading....</span>
              </Backdrop>
          </div>
          <div className={styles.breadCrumbsContainer}>
              <div className={styles.breadCrumbsSubContainer}>
                  <SVG
                      className={styles.dashboardSvg}
                      src={`/images/holidays.svg`}
                  />
                  <span className={styles.breadCrumbsSlash}>/</span>
                  <span className={styles.breadCrumbsSpan}>
                      Email to employee
                  </span>
                  <span className={styles.breadCrumbsSlash}>/</span>
                  <span className={styles.breadCrumbsSpan}>New</span>
              </div>
              <h1 className={styles.breadCrumbSpan2}>
                  Compose Email for Employees
              </h1>
          </div>

          <div className={styles.mainCard}>
              <div className={styles.gridContainer}>
                  <Grid item xs={12}>
                      <Grid
                          container
                          spacing={1}
                          className={styles.gridSubItems}
                      >
                          <Grid
                              item
                              xs={12}
                              sm={12}
                              className={styles.fieldGrid}
                          >
                              <FormControl fullWidth>
                                  <TextField
                                      id="compose_email_subject"
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
                          <Grid
                              item
                              xs={12}
                              sm={12}
                              className={styles.fieldGrid}
                          >
                              <FormControl fullWidth>
                                  <TextField
                                      id="compose_email_message"
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
                          <Grid
                              item
                              xs={12}
                              sm={12}
                              className={styles.fieldGrid}
                          >
                              <Button
                                  id="compose_email_save"
                                  variant="contained"
                                  color="primary"
                                  className={styles.applyButton}
                                  onClick={mailToAll}
                              >
                                  Send
                              </Button>
                              <Button
                                  id="compose_email_cancel"
                                  onClick={() => {
                                      history.push("/employees/mail");
                                  }}
                                  variant="contained"
                                  color="default"
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
