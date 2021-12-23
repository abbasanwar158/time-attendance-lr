import React, { useState, useContext, useEffect } from "react";
import styles from "./MailToEmployees.module.scss";
import SVG from "react-inlinesvg";
import { RootContext } from "../../../context/RootContext";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function MailToEmployees() {
    const classes = useStyles2();
    const { ActiveEmployeeNames } = useContext(RootContext);
    const history = useHistory();
    const [message, setMessage] = useState([]);
    const [open, setOpen] = useState(false);

    const mailMessage = () => {
        setOpen(true);
        fetch(`https://devbox-attendance.herokuapp.com/api/employees/mail`)
            .then((res) => res.json())
            .then(
                (response) => {
                    setMessage(response);
                    setOpen(false);
                },
                (error) => {
                    setOpen(false);
                    console.log("error", error);
                }
            );
    };

    useEffect(() => {
        mailMessage();
    }, []);

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
                    <span className={styles.breadCrumbsSpan}>Email to</span>
                    <span className={styles.breadCrumbsSlash}>/</span>
                    <span className={styles.breadCrumbsSpan}>Employees</span>
                </div>
                <h1 className={styles.breadCrumbSpan2}>Sent Emails</h1>
                <div className={styles.mt1}>
                    <Button
                        id="Sent_Emails_compose"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            history.push("/employees/mail/new");
                        }}
                    >
                        Compose
                    </Button>
                </div>
            </div>
            <div className={styles.flex}>
                <TableContainer component={Paper} className={styles.table}>
                    <Table
                        className={classes.table}
                        aria-label="custom pagination table"
                    >
                        <TableHead className={styles.tableHeader}>
                            <TableRow>
                                <TableCell className={styles.TableCell}>
                                    Date
                                </TableCell>
                                <TableCell className={styles.TableCell}>

                                    Subject
                                </TableCell>
                                <TableCell className={styles.TableCell}>
                                    Body
                                </TableCell>
                                {/* <TableCell className={styles.TableCell}>
                                    Action
                                </TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {message.length < 1
                                ? ""
                                : message.map((row) => (
                                      <TableRow key={row.id}>
                                          <TableCell
                                              className={styles.subCells}
                                          >
                                              {row.created_at.slice(0, 10)}
                                          </TableCell>
                                          <TableCell
                                              className={styles.subCells}
                                          >
                                              {row.subject}
                                          </TableCell>
                                          <TableCell
                                              className={styles.subCells}
                                          >
                                              {row.body}
                                          </TableCell>
                                          {/* <TableCell
                                              className={styles.subCells}
                                          >
                                              <button
                                                  onClick={(e) => {
                                                      history.push(
                                                          "/employees/mail/edit"
                                                      );
                                                  }}
                                              >
                                                  Edit
                                              </button>
                                          </TableCell> */}
                                      </TableRow>
                                  ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
