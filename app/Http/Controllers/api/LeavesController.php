<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Leave;
use App\Models\Employees;

use Illuminate\Http\Request;

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
            ->get(['employees.name',  'employees.active','leaves.time','leaves.status','leaves.date','leaves.note']);
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
        // return $request;

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
    public function update(Request $request, Leaves $leaves)
    {
        //
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
}