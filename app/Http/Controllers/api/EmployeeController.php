<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use DateTime;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Employee::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function EmployeeRecord($id)
    {
      return $data = Employee::select('*')
            ->where('employees.employee_external_id', $id)
            ->get();
        //
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function EmployeeEditStatus(Request $request ,$id)
    {
      $data = Employee::find($id);
      $data->update([
          'review_date' => $request->review,
          'reminder_review_date' => $request->reminder,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data =  Employee::create([
            'employee_external_id' => $request->employee_external_id,
            'name' => $request->name,
            'cnic' => $request->cnic,
            'email' => $request->email,
            'active' => $request->active,
            'designation' => $request->designation,
            'description' => $request->description,
            'joining_date' => $request->joining_date,
            'employees_category' => $request->employee_cat,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at
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
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Employee::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return Employee::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Employee::find($id);
        $data->update([
            'employee_external_id' => $request->employee_external_id,
            'name' => $request->name,
            'cnic' => $request->cnic,
            'email' => $request->email,
            'active' => $request->active,
            'designation' => $request->designation,
            'description' => $request->description,
            'joining_date' => $request->joining_date,
            'employees_category' => $request->employee_cat,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at
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
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $res = Employee::find($id)->delete($id);
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
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function editStatus(Request $request, $id)
    {
        $data = Employee::find($id);
        $data->update([
            'active' => $request->active,
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
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function uploadCSV(Request $request)
    {
      //$data = Employee::find($request->id);
      $data = Employee::select('*')
      ->where('employee_external_id', '=', $request->id)
      ->get();
      $length=count($data);
      
      if($length >= 1 ){
        $data=Employee::select('*')
                ->where('employee_external_id', '=', $request->id)
                ->update([
                  'employee_external_id' => $request->id,
                  'name' => $request->name,
                  'cnic' => $request->cnic,
                  'email' => $request->email,
                  'active' => $request->active,
                  'designation' => $request->designation,
                  'description' => $request->description,
                  'joining_date' => $request->joining_date,
                  'created_at' => $request->created_at,
                  'updated_at' => $request->updated_at
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
         $data =  Employee::create([
          'employee_external_id' => $request->id,
          'name' => $request->name,
          'cnic' => $request->cnic,
          'email' => $request->email,
          'active' => $request->active,
          'designation' => $request->designation,
          'description' => $request->description,
          'joining_date' => $request->joining_date,
          'created_at' => $request->created_at,
          'updated_at' => $request->updated_at
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
        return "record not found";
      }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function EmployeeReport($id,$year)
    {  
      $totalHoursSpend = 0;
        $totalMinSpend = 0;
      $data =DB::table('attendances')
      ->join('employees', 'employee_external_id', '=', 'attendances.employee_id')
      //->join('attendances', 'employee_id', '=', 'employees.employee_external_id')
      
      ->where('attendances.employee_id', '=',$id)

      ->whereYear('attendances.date', '=', $year)
      ->get(['employees.name',  'employees.active', 'employees.joining_date','employees.employee_external_id','attendances.id', 'attendances.date', 'attendances.checkin', 'attendances.checkout']);
    
    return $data;
       
      
      
    }
}