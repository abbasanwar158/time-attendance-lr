import React, { useState, useContext, useEffect } from "react";
import styles from "./ApplyLeave.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


export default function ApplyLeaves() {

  const [leaveTypes, setLeaveTypesNames] = useState([
    'Personal',
    'Compasssionate/Bereavement',
    'Long Service',
    'Paternity',
    'Bereavement',
    'Without Pay',
    'Blood Donor',
  ])
  const [selected, setSelected] = useState('')
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
      setSelected(event.target.value);
  };

  const Chevron = () => {
      return (
          <span className={styles.dropDownCustomizeSvg}>
              <SVG src={`/images/downArrow.svg`} />
          </span>
      );
  };
  const applyLeave = () => {
      var flagdate = new Date();
      try {
          fetch("https://time-attendance-lr.herokuapp.com/api/leave/new/request", {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  userId: localStorage.userId,
                  leave: selected,
                  from: startDate,
                  to: endDate,
                  subject: subject,
                  message: message,
                  created_at: flagdate,
                  updated_at: flagdate,
              }),
          })
              .then((response) => response.json())
              .then((data) => {
                  console.log("Success:", data);
              })
              .catch((error) => {
                  console.error("Error:", error);
              });
      } catch (err) {
          console.log(error);
      }
  };

  return (
      <>
          <div className={styles.breadCrumbsContainer}>
              <div className={styles.breadCrumbsSubContainer}>
                  <SVG
                      className={styles.dashboardSvg}
                      src={`/images/holidays.svg`}
                  />
                  <span className={styles.breadCrumbsSlash}>/</span>
                  <span className={styles.breadCrumbsSpan}>Leave</span>
                  <span className={styles.breadCrumbsSlash}>/</span>
                  <span className={styles.breadCrumbsSpan}>
                      Apply For Leave
                  </span>
              </div>
              <h1 className={styles.breadCrumbSpan2}>Apply For Leave</h1>
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
                                      id="questions"
                                      fullWidth
                                      size="small"
                                      label="Select Leave Type"
                                      variant="outlined"
                                      value={selected}
                                      onChange={handleChange}
                                      className={styles.placeholderColor}
                                      menuprops={{ variant: "menu" }}
                                      select
                                      SelectProps={{
                                          IconComponent: () => <Chevron />,
                                      }}
                                  >
                                      {leaveTypes.map((option) => (
                                          <MenuItem key={option} value={option}>
                                              {option}
                                          </MenuItem>
                                      ))}
                                  </TextField>
                              </FormControl>
                          </Grid>
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
                                      <Grid item xs={12} sm={5}>
                                          <FormControl fullWidth>
                                              <TextField
                                                  id="date"
                                                  label="From"
                                                  type="date"
                                                  variant="outlined"
                                                  value={startDate}
                                                  onChange={(e) =>
                                                      setStartDate(
                                                          e.target.value
                                                      )
                                                  }
                                                  // defaultValue="2021-07-29"
                                                  size="small"
                                                  InputLabelProps={{
                                                      shrink: true,
                                                  }}
                                              />
                                          </FormControl>
                                      </Grid>
                                      <Grid
                                          item
                                          xs={12}
                                          sm={5}
                                          className={styles.toGrid}
                                      >
                                          <FormControl fullWidth>
                                              <TextField
                                                  id="date"
                                                  label="To"
                                                  type="date"
                                                  variant="outlined"
                                                  value={endDate}
                                                  onChange={(e) =>
                                                      setEndDate(e.target.value)
                                                  }
                                                  // defaultValue="2021-07-29"
                                                  size="small"
                                                  InputLabelProps={{
                                                      shrink: true,
                                                  }}
                                              />
                                          </FormControl>
                                      </Grid>
                                  </Grid>
                              </Grid>
                          </Grid>
                          <Grid
                              item
                              xs={12}
                              sm={12}
                              className={styles.fieldGrid}
                          >
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
                          <Grid
                              item
                              xs={12}
                              sm={12}
                              className={styles.fieldGrid}
                          >
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
                          <Grid
                              item
                              xs={12}
                              sm={12}
                              className={styles.fieldGrid}
                          >
                              <Button
                                  variant="contained"
                                  color="primary"
                                  className={styles.applyButton}
                                  onClick={applyLeave}
                              >
                                  Apply
                              </Button>
                              <Button variant="contained" color="default">
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
