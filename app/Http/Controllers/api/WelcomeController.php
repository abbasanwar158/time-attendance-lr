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
    public function leavesInformation($month, $year)
    {
        $Employee= DB :: table('employees')
          ->Where('active','=','1')
          ->get();
        $finalData = array();
        $todayYear = date('Y');
        $todayMonth = date('m');
        if ($year == 'null'){
            $year = $todayYear;
        }
        if($month == 'null'){
            $month = $todayMonth;
        }
        $month_number = date('m', strtotime($month . $year));
        foreach($Employee as $key => $value ){
            $dataHalf = Leave::join('employees', 'employee_external_id', '=', 'leaves.employee_id')
                ->where("employee_id",'=', $value->employee_external_id)
                ->where('status', '=', 'Half')
                ->whereYear('date', '=', $year)
                ->whereMonth('date', '=', $month_number)
                ->get(['employees.name', 'leaves.id', 'leaves.status', 'leaves.employee_id']);
            $halfLength = count($dataHalf);
    
            $dataFull = Leave::join('employees', 'employee_external_id', '=', 'leaves.employee_id')
                ->where("employee_id",'=', $value->employee_external_id)
                ->where('status', '=', 'Full')
                ->whereYear('date', '=', $year)
                ->whereMonth('date', '=', $month_number)
                ->get(['employees.name', 'leaves.id', 'leaves.status', 'leaves.employee_id']);
            $fullLenght = count($dataFull);
            array_push($finalData, [
                'EmplName' => $value->name,
                'EmpId' => $value->employee_external_id,
                'half' => $halfLength,
                'full' => $fullLenght
            ]);
        }
        return $finalData;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Welcome  $welcome
     * @return \Illuminate\Http\Response
     */
    public function hoursInformation($startDate, $endDate)
    {
        $Employee= DB :: table('employees')
          ->Where('active','=','1')
          ->get();
        $finalData = array();

        foreach($Employee as $key => $emp ){
          $totalHoursSpend = 0;
          $totalMinSpend = 0;
        $data = Attendance::join('employees', 'employee_external_id', '=', 'attendances.employee_id')
        ->where("employee_id",'=', $emp->employee_external_id)
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
            $minutsArr = $data[count($data) - 1];
            if($minutsArr->minutes > 60){
                $min = $minutsArr->minutes / 60;
                $hours = $minutsArr->hours + $min;
                $totalHours = explode('.', $hours);
                if(count($totalHours) > 1){
                    array_push($finalData, [
                        'name' => $emp->name,
                        'hours' => $totalHours[0],
                        'minutes' => $totalHours[1][0],
                    ]);
                }
                else{
                  array_push($finalData, [
                    'name' => $emp->name,
                    'hours' => $totalHours[0],
                    'minutes' => $totalHours[1][0],
                  ]);
                }
            }
            else{
                array_push($finalData, [
                    'name' => $emp->name,
                    'hours' => $minutsArr->hours,
                    'minutes' => 0,
                ]);
            }
        }
        else{
            array_push($finalData, [
                'name' => $emp->name,
                'hours' => 0,
                'minutes' => 0,
            ]);
        }
    }
    return $finalData;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Welcome  $welcome
     * @return \Illuminate\Http\Response
     */
    public function singleLeave($name)
    {
        $year = Carbon::now()->year;
        $month_number = Carbon::now()->month;
        $dataHalf = Leave::join('employees', 'employee_external_id', '=', 'leaves.employee_id')
            ->where("name",'=', $name)
            ->where('status', '=', 'Half')
            ->whereYear('date', '=', $year)
            ->whereMonth('date', '=', $month_number)
            ->get(['employees.name', 'leaves.id', 'leaves.status', 'leaves.employee_id']);
            $halfLength = count($dataHalf);
    
        $dataFull = Leave::join('employees', 'employee_external_id', '=', 'leaves.employee_id')
            ->where("name",'=', $name)
            ->where('status', '=', 'Full')
            ->whereYear('date', '=', $year)
            ->whereMonth('date', '=', $month_number)
            ->get(['employees.name', 'leaves.id', 'leaves.status', 'leaves.employee_id']);
            $fullLenght = count($dataFull);
        return [
            'EmplName' => $name,
            'half' => $halfLength,
            'full' => $fullLenght
        ];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Welcome  $welcome
     * @return \Illuminate\Http\Response
     */
    public function singleHour($name)
    {
        $year = Carbon::now()->year;
        $month_number = Carbon::now()->month;
        $startDate = $year.'/'.$month_number.'/'.'01';  
        $endDate = date('Y-m-d');
        $data = Attendance::join('employees', 'employee_external_id', '=', 'attendances.employee_id')
        ->where("name",'=', $name)
        ->whereBetween('date', [$startDate, $endDate])
        ->get(['employees.name', 'attendances.checkin', 'attendances.checkout',]);
        $totalHoursSpend = 0;
        $totalMinSpend = 0;
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
            $minutsArr = $data[count($data) - 1];
            if($minutsArr->minutes > 60){
                $min = $minutsArr->minutes / 60;
                $hours = $minutsArr->hours + $min;
                $totalHours = explode('.', $hours);
                if(count($totalHours) > 1){
                    return [
                        'name' => $name,
                        'hours' => $totalHours[0],
                        'minutes' => $totalHours[1][0],
                    ];
                }
                else{
                    return [
                        'name' => $name,
                        'hours' => $totalHours[0],
                        'minutes' => $totalHours[1][0],
                    ];
                }
            }
            else{
                return [
                    'name' => $name,
                    'hours' =>  $minutsArr->hours,
                    'minutes' => 0,
                ];
            }
        }
        else{
            return [
                'name' => $name,
                'hours' => 0,
                'minutes' => 0,
            ];
        }
    }

}
