<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Holiday;
use App\Models\Leave;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use DateTime;

class WelcomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function onLeave()
    {
        $today = date('Y-m-d');
        $currentDay = date('l', strtotime($today));
        if($currentDay == 'Saturday' || $currentDay == 'Sunday'){
            $res=[
                'activeEmployees'=> 0,
                'onLeaves'=> 0,
                'currentDay' => $currentDay
              ];
            return response()->json($res);
        }
        else{
            $leaves =  DB::table('leaves')->where('date' ,'=', $today)->get();
            $employees =  DB::table('employees')->where('active' ,'=', 1)->get();
            $res=[
                'activeEmployees'=> count($employees),
                'onLeaves'=> count($leaves),
                'currentDay' => 0
              ];
            return response()->json($res);
        }

        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function presentEmployees()
    {
        $today = date('Y-m-d');
        $attendances =  DB::table('attendances')->where('date' ,'=', $today)->get();
            $res=[
                'todayAttendances'=> count($attendances),
              ];
            return response()->json($res);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function upComeHolidays(Request $request)
    {
        $today = date('Y-m-d');
        $holiday = DB::table('holidays')->where('date', '>=', $today)->first();
        return $holiday;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Welcome  $welcome
     * @return \Illuminate\Http\Response
     */
    public function leavesInformation($month, $year, $employeeExId, $empName)
    {
        $todayYear = date('Y');
        $todayMonth = date('m');
        if ($year == 'null'){
            $year = $todayYear;
        }
        if($month == 'null'){
            $month = $todayMonth;
        }
        $month_number = date('m', strtotime($month . $year));
        $dataHalf = Leave::join('employees', 'employee_external_id', '=', 'leaves.employee_id')
            ->where("employee_id",'=', $employeeExId)
            ->where('status', '=', 'Half')
            ->whereYear('date', '=', $year)
            ->whereMonth('date', '=', $month_number)
            ->get(['employees.name', 'leaves.id', 'leaves.status', 'leaves.employee_id']);
        $halfLength = count($dataHalf);

        $dataFull = Leave::join('employees', 'employee_external_id', '=', 'leaves.employee_id')
            ->where("employee_id",'=', $employeeExId)
            ->where('status', '=', 'Full')
            ->whereYear('date', '=', $year)
            ->whereMonth('date', '=', $month_number)
            ->get(['employees.name', 'leaves.id', 'leaves.status', 'leaves.employee_id']);
        $fullLenght = count($dataFull);
        $x = (object) [
            'EmplName' => $empName,
            'EmpId' => $employeeExId,
            'half' => $halfLength,
            'full' => $fullLenght
        ];
        return $x;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Welcome  $welcome
     * @return \Illuminate\Http\Response
     */
    public function hoursInformation($startDate, $endDate, $employeeExId, $emplName)
    {
        $totalHoursSpend = 0;
        $totalMinSpend = 0;
        $data = Attendance::join('employees', 'employee_external_id', '=', 'attendances.employee_id')
        ->where("employee_id",'=', $employeeExId)
        ->whereBetween('date', [$startDate, $endDate])
        ->get(['employees.name', 'attendances.checkin', 'attendances.checkout',]);
        foreach($data as $key => $value ){
            $date1 = new DateTime($value->checkin);
            $date2 = new DateTime($value->checkout);
            $difference = $date1->diff($date2);
            $totalHoursSpend = $totalHoursSpend + sprintf("%02d", $difference->h);
            $totalMinSpend = $totalMinSpend + sprintf("%02d", $difference->i);
            $value->hours = $totalHoursSpend;
            $value->minutes = $totalMinSpend;
        }
        if(count($data) > 0){
            $arrayIndex = count($data) - 1;
            if($data[$arrayIndex]->minutes > 60){
                $min = $data[$arrayIndex]->minutes / 60;
                $hours = $data[$arrayIndex]->hours + $min;
                $totalHours = explode('.', $hours);
                if(count($totalHours) > 1){
                    $data[$arrayIndex]->hours = $totalHours[0];
                    $data[$arrayIndex]->minutes = $totalHours[1][0];
                }
                else{
                    $data[$arrayIndex]->hours = $totalHours[0];
                    $data[$arrayIndex]->minutes = 0;
                }
            }
            return $data[$arrayIndex];
        }
        else{
            $x = (object) [
                'name' => $emplName,
                'hours' => 0,
                'minutes' => 0,
            ];
            return $x;
        }
        return $data;
    }
}
