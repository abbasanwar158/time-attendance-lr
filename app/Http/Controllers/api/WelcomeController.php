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
        $currentDay = date('l', strtotime('2021-12-26'));
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
    public function leavesInformation(Welcome $welcome)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Welcome  $welcome
     * @return \Illuminate\Http\Response
     */
    public function hoursInformation(Welcome $welcome)
    {
        //
    }
}
