<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequests;
use Illuminate\Http\Request;

class LeaveRequestsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $data = LeaveRequests::create([
            'leave_type' => $request->leave,
            'date_from' => $request->from,
            'date_to' => $request->to,
            'subject' => $request->subject,
            'message' => $request->message,
            'created_at'=>$request->created_at,
            'updated_at'=>$request->updated_at
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Leave_Requests  $leave_Requests
     * @return \Illuminate\Http\Response
     */
    public function show(Leave_Requests $leave_Requests)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Leave_Requests  $leave_Requests
     * @return \Illuminate\Http\Response
     */
    public function edit(Leave_Requests $leave_Requests)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Leave_Requests  $leave_Requests
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Leave_Requests $leave_Requests)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Leave_Requests  $leave_Requests
     * @return \Illuminate\Http\Response
     */
    public function destroy(Leave_Requests $leave_Requests)
    {
        //
    }
}
