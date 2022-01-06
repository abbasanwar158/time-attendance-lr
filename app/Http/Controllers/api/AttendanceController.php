<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DateTime;

use Illuminate\Support\Facades\DB;
use Mail;

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
        ->get(['employees.name', 'employees.active', 'attendances.id', 'attendances.category_status', 'attendances.absent_status', 'attendances.date', 'attendances.checkin', 'attendances.checkout', 'attendances.created_at']);
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
        ->get(['employees.name', 'employees.active', 'attendances.id', 'attendances.category_status', 'attendances.absent_status', 'attendances.date', 'attendances.checkin', 'attendances.checkout']);
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
            'category_status' => $request->category,
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
            ->get(['employees.name', 'employees.active', 'attendances.category_status', 'employees.employee_external_id', 'attendances.id', 'attendances.date', 'attendances.checkin', 'attendances.checkout', 'attendances.created_at']);
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
            'category_status' => $request->category,
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
      if($empId == 'null'){
        $empId = null;
      }
      if($from == 'null'){
        $from = '2000-01-01';
      }
    
     $data = Attendance::select('*')
          ->where([
              ['employee_id', 'LIKE', $empId],
              ['date', '>=', $from],
              ['date','<=', $to],
          ])
          ->join('employees', 'employee_external_id', '=', 'attendances.employee_id')
          ->get(['employees.name',  'employees.active', 'attendances.id', 'attendances.category_status', 'attendances.absent_status', 'attendances.date', 'attendances.checkin', 'attendances.checkout']);
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
                    'category_status' => $request->category,
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
                'category_status' => $request->category,
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

     /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function emailAttendance(Request $request)
    {
      
      
      $Admin= DB :: table('users')
          ->Where('is_admin','=','1')
          ->get(['username']);
      
          $Employee= DB :: table('employees')
          ->Where('active','=','1')
          ->get(['email','employee_external_id','name']);

          foreach($Employee as $employee)
          {
            
            $month_number = date('m', strtotime($request->Month));
            $users = DB::table('attendances')
                  ->join('employees', 'employee_external_id', '=', 'attendances.employee_id')
                  ->whereYear('date', '=',  $request->Year)
                  ->whereMonth('date', '=', $month_number)
                  ->Where("employee_id",'=',$employee->employee_external_id)
                  
                  ->get(['employees.name',  'employees.active', 'attendances.id', 'attendances.category_status', 'attendances.date', 'attendances.checkin', 'attendances.checkout']);
           
            $filename =  'Attendance.csv';
            $file = fopen('php://temp', 'w+');
            $column_headers = ['Name', 'Date', 'CheckIn', 'CheckOut'];
              fputcsv($file, $column_headers);
            foreach ($users as $task) {
                             $row['Name']  = $task->name;
                             $row['Date']    = $task->date;
                             $row['CheckIn']    = $task->checkin;
                             $row['CheckOut']  = $task->checkout;
            
                             fputcsv($file, [$row['Name'], $row['Date'], $row['CheckIn'], $row['CheckOut']]);
                         }

              rewind($file);
            
              Mail::send('mail', [], function($message) use($file, $filename,$request,$employee)
              {
                  $message->to($employee->email)
                    ->cc('aamir.mughal@devbox.co')
                    ->subject($request->Month.' Attendance Sheet');
                  $message->attachData(stream_get_contents($file), $filename);
              });
            fclose($file);
          }
          
          if($request->admin){
            
            foreach($Admin as $admin){
              
                        $month_number = date('m', strtotime($request->Month));
                        $filename =  'Attendance.csv';
                        $file = fopen('php://temp', 'w+');
                        $column_headers = ['Name',$request->Year.'-'.$month_number.'-01',$request->Year.'-'.$month_number.'-02',$request->Year.'-'.$month_number.'-03',$request->Year.'-'.$month_number.'-04',$request->Year.'-'.$month_number.'-05',$request->Year.'-'.$month_number.'-06',$request->Year.'-'.$month_number.'-07',$request->Year.'-'.$month_number.'-08',$request->Year.'-'.$month_number.'-09',$request->Year.'-'.$month_number.'-10',$request->Year.'-'.$month_number.'-11',$request->Year.'-'.$month_number.'-12',$request->Year.'-'.$month_number.'-13',
                                            $request->Year.'-'.$month_number.'-14',$request->Year.'-'.$month_number.'-15',$request->Year.'-'.$month_number.'-16',$request->Year.'-'.$month_number.'-17',$request->Year.'-'.$month_number.'-18',$request->Year.'-'.$month_number.'-19',$request->Year.'-'.$month_number.'-20',$request->Year.'-'.$month_number.'-21',
                                            $request->Year.'-'.$month_number.'-22',$request->Year.'-'.$month_number.'-23',$request->Year.'-'.$month_number.'-24',$request->Year.'-'.$month_number.'-25',$request->Year.'-'.$month_number.'-26',$request->Year.'-'.$month_number.'-27',$request->Year.'-'.$month_number.'-28',$request->Year.'-'.$month_number.'-29',
                                            $request->Year.'-'.$month_number.'-30',$request->Year.'-'.$month_number.'-31'];
                        fputcsv($file, $column_headers);
                        foreach($Employee as $employee)
                        {
                          $users = DB::table('attendances')
                              ->join('employees', 'employee_external_id', '=', 'attendances.employee_id')
                              ->whereYear('date', '=',  $request->Year)
                              ->whereMonth('date', '=', $month_number)
                              ->Where("employee_id",'=',$employee->employee_external_id)
                              ->get(['employees.name',  'employees.active', 'attendances.id', 'attendances.category_status', 'attendances.date', 'attendances.checkin', 'attendances.checkout']);
                            $temp=count($Employee);
                            $length=count($users);
                            $row = array();
                            $row['Name']  = $employee->name;
                             for ($n=1;$n <=31;$n++){
                                       $day = date('l', strtotime($column_headers[$n]));
                                       $today = $day;
                                      
                                       if($today == 'Saturday' )
                                       {
                                         $row[$column_headers[$n]]="Saturday";
                                       }
                                       else if($today == 'Sunday'){
                                        $row[$column_headers[$n]]="Sunday";
                                       }
                                       else
                                       {
                                        $row[$column_headers[$n]]="Absent";
                                        
                                       }
                                       
                                      
                            } 
                                    
                            for($x=1;$x<=31;$x++){
                                       
                                for($j=0;$j< $length;$j++){
                                            
                                    $date=$users[$j]->date;      
                                    if($column_headers[$x] == $date){
                                              $totalHoursSpend = 0;
                                              $totalMinSpend = 0;
                                              $date1 = new DateTime($users[$j]->checkin);
                                              $date2 = new DateTime($users[$j]->checkout);
                                              $difference = $date1->diff($date2);
                                              $totalHoursSpend = $totalHoursSpend + sprintf("%02d", $difference->h);
                                              $totalMinSpend = $totalMinSpend + sprintf("%02d", $difference->i);
                                              $hours = $totalHoursSpend;
                                              $minutes = $totalMinSpend;
                                              $row[$column_headers[$x]]= $hours." hours and ".$minutes." minutes" ;
                  
                                     }
                                            
                                         
                                }
                                          
                                          
                            }
                              
                            fputcsv($file, [$row['Name'],$row[$request->Year.'-'.$month_number.'-01'],$row[$request->Year.'-'.$month_number.'-02'],$row[$request->Year.'-'.$month_number.'-03'],$row[$request->Year.'-'.$month_number.'-04'],$row[$request->Year.'-'.$month_number.'-05'],$row[$request->Year.'-'.$month_number.'-06'],$row[$request->Year.'-'.$month_number.'-07'],$row[$request->Year.'-'.$month_number.'-08'],$row[$request->Year.'-'.$month_number.'-09'],$row[$request->Year.'-'.$month_number.'-10'],$row[$request->Year.'-'.$month_number.'-11'],$row[$request->Year.'-'.$month_number.'-12'],$row[$request->Year.'-'.$month_number.'-13'],
                              $row[$request->Year.'-'.$month_number.'-14'],$row[$request->Year.'-'.$month_number.'-15'],$row[$request->Year.'-'.$month_number.'-16'],$row[$request->Year.'-'.$month_number.'-17'],$row[$request->Year.'-'.$month_number.'-18'],$row[$request->Year.'-'.$month_number.'-19'],$row[$request->Year.'-'.$month_number.'-20'],$row[$request->Year.'-'.$month_number.'-21'],
                              $row[$request->Year.'-'.$month_number.'-22'],$row[$request->Year.'-'.$month_number.'-23'],$row[$request->Year.'-'.$month_number.'-24'],$row[$request->Year.'-'.$month_number.'-25'],$row[$request->Year.'-'.$month_number.'-26'],$row[$request->Year.'-'.$month_number.'-27'],$row[$request->Year.'-'.$month_number.'-28'],$row[$request->Year.'-'.$month_number.'-29'],
                              $row[$request->Year.'-'.$month_number.'-30'],$row[$request->Year.'-'.$month_number.'-31']]);
                  
                              }
                        rewind($file);
                                      
                        Mail::send('mail', [], function($message) use($file, $filename,$request,$admin)
                        {
                            $message->to($admin->email)
                              ->cc('aamir.mughal@devbox.co')
                              ->subject($request->Month.' Attendance Sheet');
                            $message->attachData(stream_get_contents($file), $filename);
                        });
                      fclose($file);

                      }
                    }
        }

        /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function AttendanceAlert()
    {
      $attendance = DB :: table('attendances')
          ->Where('date','=',date('Y/m/d'))
          ->get();
          if(count($attendance) > 1){
              $Employee= DB :: table('employees')
                ->Where('active','=','1')
                ->get(['email','employee_external_id','name']);
                $presentEmployee=[];
                $EmployeeName=[];
                $employeeId = [];
                $presentEmpId =[];
                foreach($Employee as $employee){
                  array_push($EmployeeName,$employee->email);
                }
                foreach($Employee as $employee){
                  array_push($employeeId,$employee->employee_external_id);
                }
              $today = Carbon::today();
              $ldate = date('d/m/Y');
              $day = Carbon::createFromFormat('d/m/Y', $ldate)->format('l');
              $data = Attendance::where('date', '=', $today)->join('employees', 'employee_external_id', '=', 'attendances.employee_id')
              ->get(['employees.name', 'employees.active', 'employees.email','employees.employee_external_id', 'attendances.category_status', 'attendances.id', 'attendances.date', 'attendances.checkin', 'attendances.checkout']);
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
      
                  foreach($Employee as $employee){
                  
                    if($employee->employee_external_id == $value->employee_external_id ) {
                    
                      array_push($presentEmployee,$value->email);
                      array_push($presentEmpId,$value->employee_external_id);
                        if($value->timeSpend < '09:00:00'){
                          
                          if($day == 'Saturday' or $day == 'Sunday')
                          {
                            return $day;
                          }
                          else{
                            $data = ['employeeName' => $value->name,"Time" => $value->timeSpend];
                            $emails = $value->email;
                            Mail::send('attendanceAlert',$data, function($message)  use ($emails)
                            {
                              $message->to($emails)
                                  ->cc('aamir.mughal@devbox.co');
                              $message->subject('Short Attendance' );
                            });  
                          }
                        }
                    }
                  }
              }
            $result = array_diff($EmployeeName, $presentEmployee);
            $resultId = array_diff($employeeId, $presentEmpId); 
      
            foreach($resultId as $valueId){
              $leave= DB :: table('leaves')
                ->Where('employee_id','=',$valueId)
                ->Where('date', '=', date('Y/m/d'))
                ->get();
              if($day == 'Saturday' or $day == 'Sunday')
              {
                return $day;
              }
              else{
                if(count($leave) < 1){
                  $data = Attendance::create([
                    'employee_id' => $valueId,
                    'date' => date('Y/m/d'),
                    'checkin' => date('Y/m/d').' '.'00:00',
                    'checkout' => date('Y/m/d').' '.'00:00',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'absent_status' => 1,
                ]);
                }
              }
            }
      
            foreach($result as $value){
      
              if($day == 'Saturday' or $day == 'Sunday')
              {
                return $day;
              }
              else{
                $emails = $value;
                Mail::send('Absent',[], function($message)  use ($emails)
                {
                  $message->to($emails)
                      ->cc('aamir.mughal@devbox.co');
                  $message->subject('Absent' );
                });  
              }
            }
          }


    }

}