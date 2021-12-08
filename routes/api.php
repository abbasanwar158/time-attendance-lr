<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//////////////////////////////////Users///////////////////////////////////////////////
Route::get('/users', [App\Http\Controllers\api\UserController::class, 'index']);
Route::post('/user/new', [App\Http\Controllers\api\UserController::class, 'store']);
Route::post('/user/update/{id}', [App\Http\Controllers\api\UserController::class, 'update']);
Route::delete('/user/delete/{id}', [App\Http\Controllers\api\UserController::class, 'destroy']);
Route::get('/user/{id}', [App\Http\Controllers\api\UserController::class, 'show']);
Route::get('/user/login/{user}/{password}', [App\Http\Controllers\api\UserController::class, 'login']);

///////////////////////////////////Employees///////////////////////////////////////////////
Route::get('/employees', [App\Http\Controllers\api\EmployeeController::class, 'index']);
Route::post('/employee/new', [App\Http\Controllers\api\EmployeeController::class, 'store']);
Route::post('/employee/update/{id}', [App\Http\Controllers\api\EmployeeController::class, 'update']);
Route::delete('/employee/delete/{id}', [App\Http\Controllers\api\EmployeeController::class, 'destroy']);
Route::get('/employee/{id}', [App\Http\Controllers\api\EmployeeController::class, 'show']);
Route::post('employee/edit_status/{id}', [App\Http\Controllers\api\EmployeeController::class, 'editStatus']);
Route::post('/employees/upload',[App\Http\Controllers\api\EmployeeController::class, 'uploadCSV']);

//////////////////////////////////Employees///////////////////////////////////////////////
Route::get('/holidays', [App\Http\Controllers\api\HolidayController::class, 'index']);
Route::post('/holiday/new', [App\Http\Controllers\api\HolidayController::class, 'store']);
Route::post('/holiday/update/{id}', [App\Http\Controllers\api\HolidayController::class, 'update']);
Route::post('/holiday/archive/{id}', [App\Http\Controllers\api\HolidayController::class, 'archive']);
Route::get('/holiday/search/{date}', [App\Http\Controllers\api\HolidayController::class, 'search']);

///////////////////////////////////Leaves///////////////////////////////////////////////
Route::get('/leaves', [App\Http\Controllers\api\LeavesController::class, 'index']);
Route::post('/leave/new', [App\Http\Controllers\api\LeavesController::class, 'store']);
Route::post('/leave/update/{id}', [App\Http\Controllers\api\LeavesController::class, 'update']);
Route::post('/leave/new/request', [App\Http\Controllers\api\LeaveRequestsController::class, 'store']);
Route::get('/leave/requests', [App\Http\Controllers\api\LeaveRequestsController::class, 'index']);
Route::post('/leave/requests/reply/{id}', [App\Http\Controllers\api\LeaveRequestsController::class, 'reply']);
Route::get('/leaves/{empId}', [App\Http\Controllers\api\LeavesController::class, 'leavesByEmployee']);
Route::post('/leaves/upload',[App\Http\Controllers\api\LeavesController::class, 'uploadCSV']);
Route::get('/leaves/report/{id}/{from}/{to}/{allEmployee}', [App\Http\Controllers\api\LeavesController::class, 'leavesReport']);
Route::get('/leaves/schedule/{empId}/{date}', [App\Http\Controllers\api\LeavesController::class, 'leavesWBS']);
Route::delete('/leave/request/delete/{id}', [App\Http\Controllers\api\LeaveRequestsController::class, 'destroy']);



///////////////////////////////////Attendances///////////////////////////////////////////////
Route::get('/attendances', [App\Http\Controllers\api\AttendanceController::class, 'index']);
Route::post('/attendance/new', [App\Http\Controllers\api\AttendanceController::class, 'store']);
Route::get('/today/attendance', [App\Http\Controllers\api\AttendanceController::class, 'todayAttendance']);
Route::post('/attendance/update/{id}', [App\Http\Controllers\api\AttendanceController::class, 'update']);
Route::get('/attendance/{id}', [App\Http\Controllers\api\AttendanceController::class, 'show']);
Route::get('/attendance/report/{empId}/{from}/{to}/{all}/{sat}/{sun}', [App\Http\Controllers\api\AttendanceController::class, 'attendanceReport']);
Route::post('/attendance/upload', [App\Http\Controllers\api\AttendanceController::class, 'uploadCSV']);


///////////////////////////////////Welcome///////////////////////////////////////////////
Route::get('/welcome/leaves', [App\Http\Controllers\api\WelcomeController::class, 'onLeave']);
Route::get('/welcome/attendances', [App\Http\Controllers\api\WelcomeController::class, 'presentEmployees']);
Route::get('/welcome/holidays', [App\Http\Controllers\api\WelcomeController::class, 'upComeHolidays']);
Route::get('/welcome/leaves/info/{month}/{year}/{employeeExId}/{empName}', [App\Http\Controllers\api\WelcomeController::class, 'leavesInformation']);
Route::get('/welcome/hours/info/{from}/{to}/{employeeExId}/{emplName}', [App\Http\Controllers\api\WelcomeController::class, 'hoursInformation']);