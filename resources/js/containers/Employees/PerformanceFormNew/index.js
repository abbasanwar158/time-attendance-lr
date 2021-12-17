import React, { useState, useContext, useEffect } from "react";
import styles from "./PerformanceFormNew.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RootContext } from "../../../context/RootContext";
import { useHistory } from "react-router-dom";


export default function PerformanceFormNew() {

  const { ActiveEmployeeNames } = useContext(RootContext);
  const history = useHistory();

  const [selected, setSelected] = useState('')
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  return (
      <>
        <div className={styles.breadCrumbsContainer}>
          <div className={styles.breadCrumbsSubContainer}>
            <SVG
              className={styles.dashboardSvg}
              src={`/images/holidays.svg`}
            />
            <span className={styles.breadCrumbsSlash}>/</span>
            <span className={styles.breadCrumbsSpan}>Appraisal Form</span>
            <span className={styles.breadCrumbsSlash}>/</span>
            <span className={styles.breadCrumbsSpan}>New</span>
          </div>
          <h1 className={styles.breadCrumbSpan2}>Employee Performace form </h1>
        </div>

        <div className={styles.mainCard}>
          <div className={styles.gridContainer}>
            <div className={styles.text}>Performace Appraisal Form</div>
            <Grid item xs={12}>
              <Grid container spacing={1} className={styles.gridSubItems} >
                <Grid item xs={12} sm={12} className={styles.fieldGrid} >
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth >
                      <TextField
                        className={styles.fieldDiv}
                        id="Employee_Performace_questions"
                        fullWidth
                        size="small"
                        label="Employee"
                        variant="outlined"
                        value={selected}
                        onChange={handleChange}
                        menuprops={{ variant: "menu" }}
                        select
                        SelectProps={{ IconComponent: () => <Chevron /> }}
                      >
                        {ActiveEmployeeNames.map((option) => (
                          <MenuItem key={option.name} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5} className={styles.toGrid} >
                    <FormControl fullWidth >
                      <TextField
                        className={styles.fieldDiv}
                        id="Employee_Performace_questions"
                        fullWidth
                        size="small"
                        label="Email"
                        type="text"
                        variant="outlined"
                      >
                      </TextField>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} className={styles.gridSubItems} >
                <Grid item xs={12} sm={12} className={styles.fieldGrid} >
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth >
                      <TextField
                        className={styles.fieldDiv}
                        id="Employee_Performace_questions"
                        fullWidth
                        size="small"
                        label="Join Date"
                        type="text"
                        variant="outlined"
                      >
                      </TextField>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className={styles.text2}>Appraisal Period</div>
              <Grid container spacing={1} className={styles.gridSubItems} >
                <Grid item xs={12}>
                  <Grid container spacing={1} className={styles.gridSubItems} >
                    <Grid item xs={12} sm={12} className={styles.fieldGrid} >
                      <Grid item xs={12} sm={5}>
                        <FormControl fullWidth>
                          <TextField
                            id="Employee_Performace_date"
                            label="From"
                            type="date"
                            variant="outlined"
                            value={startDate}
                            onChange={(e) =>
                              setStartDate(
                                e.target.value
                              )
                            }
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={5} className={styles.toGrid} >
                        <FormControl fullWidth>
                          <TextField
                            id="Performace_date"
                            label="To"
                            type="date"
                            variant="outlined"
                            value={endDate}
                            onChange={(e) =>
                              setEndDate(e.target.value)
                            }
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
                <Grid item xs={12} sm={12} className={styles.fieldGrid} >
                  <Button
                    variant="contained"
                    color="primary"
                    className={styles.applyButton}
                  >
                    Apply
                  </Button>
                  <Button onClick={(e) => history.push('/employees/performance_form')} variant="contained" color="default">
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
