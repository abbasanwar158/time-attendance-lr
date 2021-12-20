import React, { useEffect, useState } from "react";

export const RootContext = React.createContext();


export default ({ children }) => {

  const [ActiveEmployeeNames, setActiveEmployeeNames] = useState([])
  const [leavesData, setLeavesData] = useState([])
  const [leavesReqData, setLeavesReqData] = useState([])
  const [newLeave, setNewLeave] = useState([]);
  const [replyLeave, setReplyLeave] = useState([]);
  const [employeesData, setEmployeesData] = useState([])
  const [allEmployeesData, setAllEmployeesData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [attendanceData, setAttendanceData] = useState([])
  const [holidaysData, setHolidaysData] = useState([]);
  const [index, setIndex] = useState('');
  const [loginNavbar, setLoginNavbar] = useState(false);
  const [noOfLeaves, setNoOfLeaves] = useState(0);
  /*****all root context variables and function ********************/
  const defaultContext = {
    ActiveEmployeeNames,
    setActiveEmployeeNames,
    leavesData,
    setLeavesData,
    index,
    setIndex,
    employeesData,
    setEmployeesData,
    usersData,
    setUsersData,
    allEmployeesData,
    setAllEmployeesData,
    attendanceData,
    setAttendanceData,
    holidaysData,
    setHolidaysData,
    loginNavbar,
    setLoginNavbar,
    leavesReqData,
    setLeavesReqData,
    newLeave,
    setNewLeave,
    replyLeave,
    setReplyLeave,
    noOfLeaves,
    setNoOfLeaves
  };
  /*******************************************************************/

  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};
