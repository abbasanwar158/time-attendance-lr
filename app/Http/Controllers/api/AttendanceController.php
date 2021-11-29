<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DateTime;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Attendance::join('employees', 'employee_external_id', '=', 'attendances.employee_id')
        ->orderBy('date', 'DESC')
        ->get(['employees.name', 'employees.active', 'attendances.id', 'attendances.date', 'attendances.checkin', 'attendances.checkout', 'attendances.created_at']);
        foreach($data as $key => $value ){
            $date1 = new DateTime($value->checkin);
            $date2 = new DateTime($value->checkout);
            $difference = $date1->diff($date2);
            $diffInMinutes = sprintf("%02d", $difference->i);
            $diffInHours   = sprintf("%02d", $difference->h);
            $result = $diffInHours . ':' . $diffInMinutes;
            $value->timeSpend = $result;
            $day = date('l', strtotime($value->date));
            $value->day = $day;
            $value->checkin = date("g:i a", strtotime($value->checkin));
            $value->checkout = date("g:i a", strtotime($value->checkout));
        }
        return $data;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function todayAttendance()
    {
        $today = Carbon::today();
        $data = Attendance::where('date', '=', $today)->join('employees', 'employee_external_id', '=', 'attendances.employee_id')
        ->get(['employees.name', 'employees.active', 'attendances.id', 'attendances.date', 'attendances.checkin', 'attendances.checkout']);
        foreach($data as $key => $value ){
            $date1 = new DateTime($value->checkin);
            $date2 = new DateTime($value->checkout);
            $difference = $date1->diff($date2);
            $diffInMinutes = sprintf("%02d", $difference->i);
            $diffInHours   = sprintf("%02d", $difference->h);
            $result = $diffInHours . ':' . $diffInMinutes;
            $value->timeSpend = $result;
            $value->checkin = date("g:i a", strtotime($value->checkin));
            $value->checkout = date("g:i a", strtotime($value->checkout));
        }
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = Attendance::create([
            'employee_id' => $request->EmployeeId,
            'date' => $request->Date,
            'checkin' => $request->CheckIn,
            'checkout' => $request->CheckOut,
            'created_at' => $request->CreatedDate,
            'updated_at' => $request->ModifyDate
        ]);
        if ($data){
            $res=[
            'status'=>'1',
            'msg'=>'success'
          ];
          }else{
            $res=[
            'status'=>'0',
            'msg'=>'fail'
          ];
        }
          return response()->json($res);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        return DB::table('attendances')
            ->join('employees', 'employee_external_id', '=', 'attendances.employee_id')
            ->where('attendances.id', $id)
            ->get(['employees.name', 'employees.active', 'employees.employee_external_id', 'attendances.id', 'attendances.date', 'attendances.checkin', 'attendances.checkout', 'attendances.created_at']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Attendance::find($id);
        $data->update([
            'employee_id' => $request->EmployeeId,
            'date' => $request->Date,
            'checkin' => $request->CheckIn,
            'checkout' => $request->CheckOut,
            'created_at' => $request->CreatedDate,
            'updated_at' => $request->ModifyDate
        ]);
        if ($data){
            $res=[
            'status'=>'1',
            'msg'=>'success'
          ];
          }else{
            $res=[
            'status'=>'0',
            'msg'=>'fail'
          ];
        }
          return response()->json($res);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $res = Attendance::find($id)->delete($id);
        if ($res){
            $data=[
            'status'=>'1',
            'msg'=>'success'
          ];
          }else{
            $data=[
            'status'=>'0',
            'msg'=>'fail'
          ];
        }
          return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function attendanceReport($empId, $from, $to, $all, $sat, $sun)
    {
      $ldate = date('Y-m-d');
      if($to == 'null'){
        $to = $ldate;
      }
      if($all == 'true'){
        $empId = null;
      }
      if($from == 'null'){
        $from = '2000-01-01';
      }
      $data = Attendance::select('*')
          ->where([
              ['employee_id', 'LIKE', $empId],
              ['date', '>=', $from],
              ['date','<=', $to]
          ])->join('employees', 'employee_external_id', '=', 'attendances.employee_id')
          ->get(['employees.name',  'employees.active', 'attendances.id', 'attendances.date', 'attendances.checkin', 'attendances.checkout']);
          foreach($data as $key => $value ){
              $date1 = new DateTime($value->checkin);
              $date2 = new DateTime($value->checkout);
              $difference = $date1->diff($date2);
              $diffInMinutes = sprintf("%02d", $difference->i);
              $diffInHours   = sprintf("%02d", $difference->h);
              $result = $diffInHours . ':' . $diffInMinutes;
              $value->timeSpend = $result;
              $value->checkin = date("g:i a", strtotime($value->checkin));
              $value->checkout = date("g:i a", strtotime($value->checkout));
          }
          return $data;
    }

     /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function uploadCSV(Request $request)
    {   
        //$wordlist = $request->count();
        
        if($request){

             $users = Attendance::select('*')

             ->where('employee_id', '=', $request->EmployeeId)

             ->where('date', '=', $request->Date)

             ->get();

             $length=count($users);
             
            if($length >= 1){
                
                $data=Attendance::select('*')
                ->where('employee_id', '=', $request->EmployeeId)
                ->where('date', '=', $request->Date)
                ->update([
                    'employee_id' => $request->EmployeeId,
                    'date' => $request->Date,
                    'checkin' => $request->CheckIn,
                    'checkout' => $request->CheckOut,
                    'created_at' => $request->CreatedDate,
                    'updated_at' => $request->ModifyDate,
                ]);
                if ($data){
                    $res=[
                    'status'=>'1',
                    'msg'=>'success'
                  ];
                  }else{
                    $res=[
                    'status'=>'0',
                    'msg'=>'fail'
                  ];
                }
                  return response()->json($res);
            }else{
                 $data = Attendance::create([
                'employee_id' => $request->EmployeeId,
                'date' => $request->Date,
                'checkin' => $request->CheckIn,
                'checkout' => $request->CheckOut,
                'created_at' => $request->CreatedDate,
                'updated_at' => $request->ModifyDate,
            ]);
            if ($data){
                $res=[
                'status'=>'1',
                'msg'=>'success'
              ];
              }else{
                $res=[
                'status'=>'0',
                'msg'=>'fail'
              ];
            }
              return response()->json($res);
            }
           
          
        }else{
            return false;
        }
    }
}
