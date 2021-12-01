import React, { useState, useContext, useEffect } from "react";
import styles from "./UploadEmployeeData.module.scss";
import SVG from "react-inlinesvg";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";

export default function UploadEmployeeData() {
  const [file, setFile] = useState("");

  const uploadCSV = () => {
      var reader = new FileReader();
      reader.onload = function (e) {
          // Use reader.result
          var csv = reader.result;
          var lines = csv.split("\n");
          var result = [];
          var headers = lines[0].split(",");
          for (var i = 1; i < lines.length; i++) {
              var obj = {};
              var currentline = lines[i].split(",");
              for (var j = 0; j < headers.length; j++) {
                  obj[headers[j]] = currentline[j];
              }
              result.push(obj);
          }
          console.log(result);
          var today = new Date();
          for (var i = 0; i < result.length; i++) {
              // console.log(result[i].joining_date);

              if (result[i].id != "") {
                  fetch(`https://time-attendance-lr.herokuapp.com/api/employees/upload`, {
                      method: "POST",
                      headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          id: result[i].id,
                          name: result[i].name,
                          email: result[i].email,
                          cnic: result[i].cnic != null ? result[i].cnic : 0,
                          active: result[i].active,
                          designation: result[i].designation,
                          description: result[i].description,
                          joining_date: result[i].joining_date,
                          created_at: result[i].created_at,
                          updated_at: result[i].updated_at,
                      }),
                  })
                      .then((response) => response.json())
                      .then((data) => {
                          console.log("Success:", data);
                      })
                      .catch((error) => {
                          console.error("Error:", error);
                      });
              }
          }
      };
      reader.readAsText(file);
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
                  <span className={styles.breadCrumbsSpan}>Employees</span>
                  <span className={styles.breadCrumbsSlash}>/</span>
                  <span className={styles.breadCrumbsSpan}>Upload</span>
              </div>
              <h1 className={styles.breadCrumbSpan2}>
                  Upload Employee Data
              </h1>
          </div>
          <div className={styles.mainCard}>
              <Grid item xs={12}>
                  <Grid container spacing={1} className={styles.gridSubItems}>
                      <Grid item xs={12} sm={3} className={styles.fieldGrid}>
                          <FormControl fullWidth>
                              <input
                                  accept={".csv"}
                                  id="hero1"
                                  className={styles.heroInput}
                                  type={"file"}
                                  name={"upload-file"}
                                  onChange={(event) => {
                                      setFile(event.target.files[0]);
                                  }}
                              />
                          </FormControl>
                      </Grid>
                  </Grid>
              </Grid>
              <Grid item xs={12}>
                  <Grid container spacing={1} className={styles.gridSubItems}>
                      <Grid item xs={12} sm={3} className={styles.fieldGrid}>
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              className={styles.uploadButton}
                              onClick={uploadCSV}
                          >
                              Upload
                          </Button>
                          <Button
                              size="small"
                              variant="contained"
                              color="default"
                          >
                              Cancel
                          </Button>
                      </Grid>
                  </Grid>
              </Grid>
          </div>
      </>
  );
}
