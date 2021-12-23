import React, { useState, useContext, useEffect } from "react";
import styles from "./LeaveRequests.module.scss";
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function LeavesRequests() {
  const classes = useStyles2();
  const { setIndex, newLeave, setNewLeave, replyLeave, setReplyLeave, setNoOfLeaves } = useContext(RootContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    leavesReqFun();
  }, []);
  
  const leavesReqFun = () => {
  setOpen(true);
  var newLeavesArr = [];
  var replyLeavesArr = [];
  fetch("https://devbox-attendance.herokuapp.com/api/leave/requests")
  .then(res => res.json())
  .then(
    (response) => {
      for (var i = 0; i < response.length; i++) {
        if(response[i].reply_status == null){
          newLeavesArr.push(response[i]);
        }
        else{
          replyLeavesArr.push(response[i]);
        }
      }
      if(newLeavesArr.length < 1){
        setNoOfLeaves(0);
      }
      else{
        setNoOfLeaves(newLeavesArr.length);
      }
      setReplyLeave(replyLeavesArr);
      setNewLeave(newLeavesArr);
      setOpen(false);
    },
    (error) => {
      console.log("error", error)
    }
  )
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
              <SVG
                className={styles.dashboardSvg}
                src={`/images/holidays.svg`}
              />
              <span className={styles.breadCrumbsSlash}>/</span>
              <span className={styles.breadCrumbsSpan}>Leave</span>
              <span className={styles.breadCrumbsSlash}>/</span>
              <span className={styles.breadCrumbsSpan}>Requests</span>
            </div>
            <h1 className={styles.breadCrumbSpan2}>Leave Requests</h1>
          </div>
          <div className={styles.flex}>
            <div className={styles.text}>New Leave Requests</div>
            <TableContainer component={Paper} className={styles.table}>
              <Table
                className={classes.table}
                aria-label="custom pagination table"
              >
                <TableHead className={styles.tableHeader}>
                  <TableRow>
                    <TableCell className={styles.TableCell}>Employee name</TableCell>
                    <TableCell className={styles.TableCell}>Leave Type</TableCell>
                    <TableCell className={styles.TableCell}>Subject</TableCell>
                    <TableCell className={styles.TableCell}>Message</TableCell>
                    <TableCell className={styles.TableCell}>Date from</TableCell>
                    <TableCell className={styles.TableCell}>Date to</TableCell>
                    <TableCell className={styles.TableCell}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newLeave.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className={styles.subCells}>{row.name}</TableCell>
                      <TableCell className={styles.subCells}>{row.leave_type}</TableCell>
                      <TableCell className={styles.subCells}>{row.subject}</TableCell>
                      <TableCell className={styles.subCells}>{row.message}</TableCell>
                      <TableCell className={styles.subCells}>{row.date_from}</TableCell>
                      <TableCell className={styles.subCells}>{row.date_to}</TableCell>
                      <TableCell className={styles.subCells}>
                        <button
                          value={row.id}
                          onClick={(e) => {
                            var leaveId = e.target.value
                            for (var i = 0; i < newLeave.length; i++) {
                              var tempId = newLeave[i].id
                              if (tempId == leaveId) {
                                setIndex(i);
                              }
                            }
                            history.push('/leaves/requests/reply')
                          }}
                        >Reply</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className={styles.flex}>
            <div className={styles.text}>Replied Leave Requests</div>
            <TableContainer component={Paper} className={styles.table}>
              <Table
                className={classes.table}
                aria-label="custom pagination table"
              >
                <TableHead className={styles.tableHeader}>
                  <TableRow>
                    <TableCell className={styles.TableCell}>Employee name</TableCell>
                    <TableCell className={styles.TableCell}>Leave Type</TableCell>
                    <TableCell className={styles.TableCell}>Subject</TableCell>
                    <TableCell className={styles.TableCell}>Reply Message</TableCell>
                    <TableCell className={styles.TableCell}>Reply Status</TableCell>
                    <TableCell className={styles.TableCell}>Date from</TableCell>
                    <TableCell className={styles.TableCell}>Date to</TableCell>
                    {/* <TableCell className={styles.TableCell}>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                {replyLeave.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className={styles.subCells}>{row.name}</TableCell>
                      <TableCell className={styles.subCells}>{row.leave_type}</TableCell>
                      <TableCell className={styles.subCells}>{row.subject}</TableCell>
                      <TableCell className={styles.subCells}>{row.reply}</TableCell>
                      <TableCell className={styles.subCells}>{row.reply_status}</TableCell>
                      <TableCell className={styles.subCells}>{row.date_to}</TableCell>
                      <TableCell className={styles.subCells}>{row.date_from}</TableCell>
                      {/* <TableCell className={styles.subCells}>
                        <button
                          value={row.id}
                          onClick={(e) => {
                            var leaveId = e.target.value
                            for (var i = 0; i < replyLeave.length; i++) {
                              var tempId = replyLeave[i].id
                              if (tempId == leaveId) {
                                setIndex(i);
                              }
                            }
                            history.push('/leaves/requests/edit')
                          }}
                        >Edit</button>
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
