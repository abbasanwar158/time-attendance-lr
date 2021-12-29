<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Leave;
use App\Models\Employee;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Mail;

class LeavesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data=Leave::join("employees","employee_external_id","=","leaves.employee_id")
            ->get(['employees.name', 'employees.employee_external_id', 'employees.active','leaves.time','leaves.status','leaves.date','leaves.note', 'leaves.id']);
        return $data;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function leavesByEmployee($empID)
    {
        return DB::table('leaves')
            ->join('employees', 'employee_external_id', '=', 'leaves.employee_id')
            ->where('leaves.employee_id', $empID)
            ->get(['employees.name', 'employees.active', 'employees.employee_external_id', 'leaves.id', 'leaves.date', 'leaves.time',  'leaves.status', 'leaves.note', 'leaves.created_at']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data =  Leave::create([
            'employee_id'=>$request->employee_id,
            'date' => $request->date,
            'status' => $request->status,
            'note' => $request->note,
            'time'=>$request->time,
            'created_at'=>$request->created_at,
            'updated_at'=>$request->updated_at
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
        $employee = DB::table('employees')
            ->where('name', $request->name)->get();
            $data = ['name' => $request->name, 'date' => $request->date, 'status' => $request->status];
            $emails = $employee[0]->email;
            Mail::send('leavesAlert',$data, function($message)  use ($emails)
            {
              $message->to($emails)
                ->cc('aamir.mughal@devbox.co');
              $message->subject('Leave Alert'); 
            }); 
          return response()->json($res);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Leaves  $leaves
     * @return \Illuminate\Http\Response
     */
    public function show(Leaves $leaves)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Leaves  $leaves
     * @return \Illuminate\Http\Response
     */
    public function edit(Leaves $leaves)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Leaves  $leaves
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Leave::find($id);
        $data->update([
            'employee_id'=>$request->employee_id,
            'date' => $request->date,
            'status' => $request->status,
            'note' => $request->note,
            'time'=>$request->time,
            'created_at'=>$request->created_at,
            'updated_at'=>$request->updated_at
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
     * @param  \App\Models\Leaves  $leaves
     * @return \Illuminate\Http\Response
     */
    public function destroy(Leaves $leaves)
    {
        //
    }
      /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Leaves  $Leaves
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function uploadCSV(Request $request)
    {   
        
        if($request){
            $users = Leave::select('*')

             ->where('employee_id', '=', $request->employee_id)

             ->where('date', '=',$request->date,)

             ->get();
             $length=count($users);
             
             if($length >=1)
             {
                $data = Leave::select('*')

                ->where('employee_id', '=', $request->employee_id)
   
                ->where('date', '=',$request->date,)
   
                ->update([
                    'employee_id'=>$request->employee_id,
                    'date' => $request->date,
                    'status' => $request->status,
                    'note' => $request->note,
                    'time'=>$request->time,
                    'created_at'=>$request->created_at,
                    'updated_at'=>$request->updated_at
                ]);
                if ($data)
                {
                    $res=[
                    'status'=>'1',
                    'msg'=>'success'
                  ];
                  }
                  else
                  {
                    $res=[
                    'status'=>'0',
                    'msg'=>'fail'
                  ];
                }
                return response()->json($res);
             }
             else
             {
                 
                $data =  Leave::create([
                    'employee_id'=>$request->employee_id,
                    'date' => $request->date,
                    'status' => $request->status,
                    'note' => $request->note,
                    'time'=>$request->time,
                    'created_at'=>$request->created_at,
                    'updated_at'=>$request->updated_at
                ]);
                if ($data)
                {
                    $res=[
                    'status'=>'1',
                    'msg'=>'success'
                  ];
                  }
                  else
                  {
                    $res=[
                    'status'=>'0',
                    'msg'=>'fail'
                  ];
                }
                return response()->json($res);
            
             }
          
        }else{
            return "invalid Request please try again";
        }
    } 
        
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Leaves  $leaves
     * @return \Illuminate\Http\Response
     */
    public function leavesWBS($empId , $date)
    {   
        
        //
        return DB::table('leaves')
            ->join('employees', 'employee_external_id', '=', 'leaves.employee_id')

            ->where('employee_id', '=',$empId)

            ->whereYear('date', '=', $date)
            ->get(['employees.name', 'employees.active', 'employees.employee_external_id', 'leaves.id', 'leaves.date', 'leaves.time',  'leaves.status', 'employees.joining_date', 'leaves.created_at']);
             
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Leaves  $leaves
     * @return \Illuminate\Http\Response
     */
    public function leavesReport($id,$from,$to,$allEmployee)
    {
        //
        // if($allEmployee){
        //     return DB::table('leaves')
        //     ->join('employees', 'employee_external_id', '=', 'leaves.employee_id')
        //     ->whereBetween('date',[$from,$to])
        //     ->get(['employees.name',  'employees.active','leaves.time','leaves.status','leaves.date','leaves.note']);
       
        // }
        
        if ($id == 'null'){
            $id=null;
        }
        
        $ldate = date('Y-m-d');
        if($to == 'null'){
            $to = $ldate;
        }
        
        if($from == 'null'){
            $from = '2000-01-01';
        }
        
        return DB::table('leaves')
            ->join('employees', 'employee_external_id', '=', 'leaves.employee_id')

            ->where('employee_id', 'LIKE',$id)

            ->whereBetween('date',[$from,$to])
            ->get(['employees.name', 'employees.active', 'employees.employee_external_id', 'leaves.id', 'leaves.date', 'leaves.time',  'leaves.status', 'leaves.note', 'leaves.created_at']);
             
        // }
    }
}