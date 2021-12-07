import React, { useState, useContext, useEffect } from "react";
import SVG from "react-inlinesvg";
import styles from "./Sidebar.module.scss";
import { useHistory, withRouter } from "react-router-dom";
import Collapse from '@material-ui/core/Collapse';
import clsx from "clsx";


export default function Sidebar({ fromNavbar, setModalOpen }) {
  const [colExpAttendance, setColExpAttendance] = useState(false)
  const history = useHistory();
  const [colExpLeaves, setColExpLeaves] = useState(false)
  const [colExpEmployees, setColExpEmployees] = useState(false)
  const [colExpHolidays, setColExpHolidays] = useState(false)
  const [checkedAtt, setCheckedAtt] = useState(false);
  const [checkedLeave, setCheckedLeave] = useState(false);
  const [checkedEmp, setCheckedEmp] = useState(false);
  const [checkedHol, setCheckedHol] = useState(false);
  const { activeRoute, setActiveRoute } = useState(null);

  const [attendanceSubMenu, setAttendanceSubMenu] = useState([
    'Attendance Report',
    'Email Attendances',
    'Manage Attendance Manually',
    'Upload Attendances',
    'View Today Attendance',
  ])
  const [attendanceUrl, setAttendanceUrl] = useState([
    '/attendance/report',
    '/attendance/email',
    '/attendance/new',
    '/attendance/upload',
    '/attendance',
  ])

  const [holidaysUrl, setHolidaysUrl] = useState([
    '/holiday/new',
    '/holidays',
  ])
  const [attendanceSubMenuSVG, setAttendanceSubMenuSVG] = useState([
    'visibility',
    'settings',
    'description',
    'publish',
    'mail'
  ])
  
  const [leavesUrl, setLeavesUrl] = useState([
    '/leaves/new',
    '/leaves/apply',
    '/leaves/report',
    '/leaves/schedule',
    '/leaves/upload',
    '/leaves',
  ])
  
  const [leavesSubMenu, setLeavesSubMenu] = useState([
    'Add New Leave',
    'Apply Leaves',
    'Leave Report',
    'Leaves WBS',
    'Upload Leaves',
    'View Leaves',
  ])
  const [leavesSubMenuSVG, setLeavesSubMenuSVG] = useState([
    'visibility',
    'assignment',
    'add_to_queue',
    'description',
    'storage',
    'publish'
  ])
  
  const [employeesUrl, setEmployeesUrl] = useState([
    '/employees/active',
    '/employee/new',
    '/employees',
    '/employees/edit_status',
    '/employees/upload'
  ])

  const [employeesSubMenu, setEmployeesSubMenu] = useState([
    'Active Employees',
    'Add New Employee',
    'All Employees',
    'Edit Employee Status',
    "Upload Employees's Data"
  ])
  const [employeesSubMenuSVG, setEmployeesSubMenuSVG] = useState([
    'people',
    'person',
    'edit',
    'person_add',
    'publish',
  ])

  const [holidaysSubMenu, setHolidaysSubMenu] = useState([
    'Add New Holiday',
    'View Holidays',
  ])
  const [holidaysSubMenuSVG, setHolidaysSubMenuSVG] = useState([
    'visibility',
    'add_to_queue'
  ])

  const collapseFun = (e) => {
    var clicked = e.currentTarget.innerText;
    switch (clicked) {
      
      case 'Attendance':
        setCheckedAtt((prev) => !prev);
        var data = colExpAttendance;
        if (data) {
          setColExpAttendance(false)
        }
        else {
          setColExpAttendance(true)
        }
        break;
      case 'Leaves':
        setCheckedLeave((prev) => !prev);
        var data = colExpLeaves;
        if (data) {
          setColExpLeaves(false)
        }
        else {
          setColExpLeaves(true)
        }
        break;
      case 'Employees':
        setCheckedEmp((prev) => !prev);
        var data = colExpEmployees;
        if (data) {
          setColExpEmployees(false)
        }
        else {
          setColExpEmployees(true)
        } break;
      case 'Holidays':
        setCheckedHol((prev) => !prev);
        var data = colExpHolidays;
        if (data) {
          setColExpHolidays(false)
        }
        else {
          setColExpHolidays(true)
        } break;
      default:
    }

  }

  return (
    <div className={styles.container}>

      <div className={styles.positionSidebar}>
        <div className={styles.dashboardDiv}
          onClick={() => {
            history.push('/dashboard')
            setModalOpen(false)
          }}
        >
          <SVG className={styles.dashboardSvg} src={`/images/dashboard.svg`} />
          <span className={styles.dashboardText}>Dashboard</span>
        </div>
        <div className={styles.dashboardDiv2} onClick={(e)=>collapseFun(e)}>
          <SVG className={styles.dashboardSvg} src={`/images/attendance.svg`} />
          <span className={styles.dashboardText}>Attendance</span>
          {
            colExpAttendance ?
              <SVG
                className={styles.collapseSvg}
                src={`/images/minus_circle.svg`}
              /> :
              <SVG
                className={styles.collapseSvg}
                src={`/images/plus_circle.svg`}
              />
          }

        </div>

        {/* Attendace Expandabel Section Start */}
        <Collapse in={checkedAtt}>
          <div className={styles.SubMenusContainer}>
            {
              attendanceSubMenu.map((x, i) => {
                return (
                  <div 
                  className={styles.dashboardSubMenuDiv}
                  key={x}
                  onClick={() => {
                      history.push(`${attendanceUrl[i]}`)
                      setModalOpen(false)
                    }}
                  >
                    <SVG
                      className={styles.dashboardSvgSubMenu}
                      src={`/images/${attendanceSubMenuSVG[i]}.svg`}
                    />
                    <span className={styles.dashboardTextSubMenu}>{x}</span>
                  </div>
                )
              })
            }
          </div>
        </Collapse>
        {/* Attendace Expandabel Section End */}


        <div
          className={styles.dashboardDiv2}
          onClick={(e)=>collapseFun(e)}>
          <SVG
            className={styles.dashboardSvg}
            src={`/images/leaves.svg`}
          />
          <span className={styles.dashboardText}>Leaves</span>
          {
            colExpLeaves ?
              <SVG
                className={styles.collapseSvg}
                src={`/images/minus_circle.svg`}
              /> :
              <SVG
                className={styles.collapseSvg}
                src={`/images/plus_circle.svg`}
              />
          }
        </div>

        {/* Leaves Expandabel Section Start */}
        <Collapse in={checkedLeave}>
          <div className={styles.SubMenusContainer} >
            {
              leavesSubMenu.map((x, i) => {
                return (
                  <div 
                  className={styles.dashboardSubMenuDiv}
                  key={x}
                  onClick={() => {
                      history.push(`${leavesUrl[i]}`)
                      setModalOpen(false)
                    }}
                  >
                    <SVG
                      className={styles.dashboardSvgSubMenu}
                      src={`/images/${leavesSubMenuSVG[i]}.svg`}
                    />
                    <span className={styles.dashboardTextSubMenu}>{x}</span>
                  </div>
                )
              })
            }
          </div>
        </Collapse>
        {/* Leaves Expandabel Section End */}
        <div
          className={styles.dashboardDiv2}
          onClick={(e)=>collapseFun(e)}>
          <SVG
            className={styles.dashboardSvg}
            src={`/images/employees.svg`}
          />
          <span className={styles.dashboardText}>Employees</span>
          {
            colExpEmployees ?
              <SVG
                className={styles.collapseSvg}
                src={`/images/minus_circle.svg`}
              /> :
              <SVG
                className={styles.collapseSvg}
                src={`/images/plus_circle.svg`}
              />
          }
        </div>
        {/* Employees Expandabel Section Start */}
        <Collapse in={checkedEmp}>
          <div className={styles.SubMenusContainer}>
            {
              employeesSubMenu.map((x, i) => {
                return (
                  <div 
                  className={styles.dashboardSubMenuDiv}
                  key={x}
                  onClick={() => {
                    history.push(`${employeesUrl[i]}`)
                    setModalOpen(false)
                  }}
                  >
                    <SVG
                      className={styles.dashboardSvgSubMenu}
                      src={`/images/${employeesSubMenuSVG[i]}.svg`}
                    />
                    <span className={styles.dashboardTextSubMenu}>{x}</span>
                  </div>
                )
              })
            }
          </div>
        </Collapse>
        {/* Employees Expandabel Section End */}
        <div
          className={styles.dashboardDiv2}
          onClick={(e)=>collapseFun(e)}>
          <SVG
            className={styles.dashboardSvg}
            src={`/images/holidays.svg`}
          />
          <span className={styles.dashboardText}>Holidays</span>
          {
            colExpHolidays ?
              <SVG
                className={styles.collapseSvg}
                src={`/images/minus_circle.svg`}
              /> :
              <SVG
                className={styles.collapseSvg}
                src={`/images/plus_circle.svg`}
              />
          }
        </div>
        {/* Holidays Expandabel Section Start */}
        <Collapse in={checkedHol}>
          <div className={styles.SubMenusContainer}>
            {
              holidaysSubMenu.map((x, i) => {
                return (
                  <div 
                  className={styles.dashboardSubMenuDiv}
                  key={x}
                  onClick={() => {
                      history.push(`${holidaysUrl[i]}`)
                      setModalOpen(false)
                    }}
                  >
                    <SVG
                      className={styles.dashboardSvgSubMenu}
                      src={`/images/${holidaysSubMenuSVG[i]}.svg`}
                    />
                    <span className={styles.dashboardTextSubMenu}>{x}</span>
                  </div>
                )
              })
            }
          </div>
        </Collapse>
        {/* Holidays Expandabel Section End */}
      </div>
    </div >
  );
}