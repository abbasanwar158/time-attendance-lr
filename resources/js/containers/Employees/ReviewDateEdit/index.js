import React, { useState, useContext, useEffect } from "react";
import styles from "./ReviewDateEdit.module.scss";
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

export default function ReviewDateEdit() {
    const { ActiveEmployeeNames, allEmployeesData, index } =
        useContext(RootContext);
    const [selected, setSelected] = useState("");
    const [reviewDate, setReviewDate] = useState("");
    const [reminder, setReminder] = useState("");
    const [open, setOpen] = useState(false);
    const history = useHistory();

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

    useEffect(() => {
        if (allEmployeesData[index]) {
            setSelected(allEmployeesData[index].name);
            setReviewDate(allEmployeesData[index].review_date);
            setReminder(allEmployeesData[index].reminder_review_date);
        } else {
            history.push("/employees/review_date");
        }
    }, []);

    const editEmployee = () => {
        setOpen(true);
        var today = new Date();
        fetch(
            `https://time-attendance-lr.herokuapp.com/api/employees/review_date/edit/${allEmployeesData[index].id}`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    review: reviewDate,
                    reminder: reminder,
                    created_at: today,
                    updated_at: today,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setOpen(false);
                history.push("/employees/review_date");
                console.log("Success:", data);
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
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                >
                <CircularProgress color="primary" /><span className={styles.loadingText}>Loading....</span>
                </Backdrop>
            </div>
            <div className={styles.breadCrumbsContainer}>
                <div className={styles.breadCrumbsSubContainer}>
                    <SVG
                        className={styles.dashboardSvg}
                        src={`/images/holidays.svg`}
                    />
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>Employees</span>
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>Edit Review</span>
                </div>
                <h1 className={styles.breadCrumbSpan2}>
                    Edit Employee Review Date
                </h1>
            </div>
            <div className={styles.mainCard}>
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
                                    // onChange={handleChange}
                                    // menuprops={{ variant: "menu" }}
                                    // select
                                    // SelectProps={{
                                    //     IconComponent: () => <Chevron />,
                                    // }}
                                >
                                    {/* {ActiveEmployeeNames.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.name}
                                        </MenuItem>
                                    ))} */}
                                </TextField>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1} className={styles.gridSubItems}>
                        <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                            <FormControl fullWidth>
                                <TextField
                                    className={styles.fieldDiv}
                                    id="date"
                                    label="Review Date"
                                    type="date"
                                    variant="outlined"
                                    size="small"
                                    value={reviewDate}
                                    onChange={(e) =>
                                        setReviewDate(e.target.value)
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1} className={styles.gridSubItems}>
                        <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                            <FormControl fullWidth>
                                <TextField
                                    className={styles.fieldDiv}
                                    id="date"
                                    label="Reminder Review Date"
                                    type="date"
                                    variant="outlined"
                                    size="small"
                                    value={reminder}
                                    onChange={(e) =>
                                        setReminder(e.target.value)
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1} className={styles.gridSubItems}>
                        <Grid item xs={12} sm={4} className={styles.fieldGrid}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={styles.saveButton}
                                onClick={editEmployee}
                            >
                                Update
                            </Button>
                            <Button
                                variant="contained"
                                color="default"
                                onClick={(e) =>
                                    history.push("/employees/review_date")
                                }
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
