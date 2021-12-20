<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequests;
use Illuminate\Http\Request;
use Mail;

class LeaveRequestsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = LeaveRequests::join('users', 'users.id', '=', 'leave_requests.user_id')
        ->get(['leave_requests.id', 'users.username', 'users.name', 'leave_requests.subject', 'leave_requests.message', 'leave_requests.leave_type', 'leave_requests.date_from', 'leave_requests.date_to', 'leave_requests.reply_status', 'leave_requests.reply',]);
        return $data;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function reply($id, $email, $name, Request $request)
    {
        $data = LeaveRequests::find($id);
        $data->update([
            'reply' => $request->reply,
            'reply_status' => $request->replyStatus,
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
        $data = ['body' => $request->reply, 'name' => $name, 'status' =>$request->replyStatus];
        Mail::send('replyReques',$data, function($message)  use ($email,)
        {
          $message->to($email);   
          $message->subject('Reply of you leave request'); 
        });
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
            'user_id' => $request->userId,
            'leave_type' => $request->leave,
            'date_from' => $request->from,
            'date_to' => $request->to,
            'subject' => $request->subject,
            'message' => $request->message,
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
    public function destroy($id)
    {
        $res = LeaveRequests::find($id)->delete($id);
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
}
