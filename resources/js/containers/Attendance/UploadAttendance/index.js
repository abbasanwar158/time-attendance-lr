import React, { useState, useContext, useEffect, useRef } from "react";
import styles from "./UploadAttendance.module.scss";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { RootContext } from "../../../context/RootContext";

export default function UploadAttendance() {
    const { ActiveEmployeeNames } = useContext(RootContext);
    const [selected, setSelected] = useState("");
    const [file, setFile] = useState("");
    const fileRef = useRef();

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
            for (var i = 0; i < result.length; i++) {
              if(result[i].EmployeeId){
                fetch(`https://time-attendance-lr.herokuapp.com/api/attendance/upload`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        EmployeeId: result[i].EmployeeId,
                        Date: result[i].Date,
                        CheckIn: result[i].CheckIn,
                        CheckOut: result[i].CheckOut,
                        CreatedDate: result[i].CreatedDate,
                        ModifyDate: result[i].ModifyDate,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Success:", data);
                        document.getElementById("hero1").value = "";
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
                    <span className={styles.breadCrumbsSpan}>Attendance</span>
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>Upload</span>
                </div>
                <h1 className={styles.breadCrumbSpan2}>Upload attendance</h1>
            </div>
            <div className={styles.mainCard}>
                <Grid item xs={12}>
                    <Grid container spacing={1} className={styles.gridSubItems}>
                        <Grid item xs={12} sm={3} className={styles.fieldGrid}>
                            <FormControl fullWidth>
                                <input
                                    accept={".csv"}
                                    id="hero1"
                                    ref={fileRef}
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

            <div className={styles.mainCard2}>
                <Grid item xs={12}>
                    <Grid container spacing={1} className={styles.gridSubItems}>
                        <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                            <FormControl fullWidth>
                                <TextField
                                    className={styles.fieldDiv}
                                    id="questions"
                                    fullWidth
                                    size="small"
                                    label="Employee"
                                    variant="outlined"
                                    value={selected}
                                    onChange={handleChange}
                                    menuprops={{ variant: "menu" }}
                                    select
                                    SelectProps={{
                                        IconComponent: () => <Chevron />,
                                    }}
                                >
                                    {ActiveEmployeeNames.map((option) => (
                                        <MenuItem
                                            key={option.name}
                                            value={option.employee_external_id}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={1} className={styles.gridSubItems}>
                        <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                            <FormControl>
                                <FormControlLabel
                                    className={styles.allCheckbox}
                                    value="start"
                                    control={<Checkbox color="primary" />}
                                    label="ALL"
                                    labelPlacement="end"
                                />
                            </FormControl>
                            <Button
                                size="small"
                                variant="contained"
                                color="secondary"
                                className={styles.uploadButton}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
