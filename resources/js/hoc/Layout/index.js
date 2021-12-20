
import React, { useState, useContext, useEffect } from "react";
import Sidebar from '../../containers/Sidebar'
import styles from "./Layout.module.scss";
import Grid from '@material-ui/core/Grid';
import { RootContext } from "../../context/RootContext";


export default function Layout(props) {

  const { setActiveEmployeeNames, setNoOfLeaves } = useContext(RootContext);
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    var newLeavesArr = [];
    fetch("https://time-attendance-lr.herokuapp.com/api/leave/requests")
    .then(res => res.json())
    .then(
      (response) => {
        for (var i = 0; i < response.length; i++) {
          if(response[i].reply_status == null){
            newLeavesArr.push(response[i]);
          }
        }
        setNoOfLeaves(newLeavesArr.length);
      },
      (error) => {
        console.log("error", error)
      }
    )
    employeeNamesFun();
  }, []);

  const employeeNamesFun = () => {
    var employeeNamesArr = [];
    fetch("https://time-attendance-lr.herokuapp.com/api/employees")
      .then(res => res.json())
      .then(
        (response) => {
          var data = response.filter((x) => x.active)
          for (var i = 0; i < data.length; i++) {
            employeeNamesArr.push(data[i])
          }
          setActiveEmployeeNames(employeeNamesArr)
        },
        (error) => {
          console.log("error", error)
        }
      )
  }

  return (
    <>
      <main>
        <div>
          <div className={styles.flex}>
            <Grid container>
              <Grid item xs={1} sm={1} md={3}>
                <Sidebar setModalOpen={setModalOpen} />
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <div className="layoutContainer">
                  {props.children}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </main>
    </>
  );
}

