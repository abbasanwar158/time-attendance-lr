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

//////////////////////////////////Employees///////////////////////////////////////////////
Route::get('/holidays', [App\Http\Controllers\api\HolidayController::class, 'index']);
Route::post('/holiday/new', [App\Http\Controllers\api\HolidayController::class, 'store']);
Route::post('/holiday/update/{id}', [App\Http\Controllers\api\HolidayController::class, 'update']);
Route::post('/holiday/archive/{id}', [App\Http\Controllers\api\HolidayController::class, 'archive']);
Route::get('/holiday/search/{date}', [App\Http\Controllers\api\HolidayController::class, 'search']);

///////////////////////////////////Leaves///////////////////////////////////////////////
Route::get('/leaves', [App\Http\Controllers\api\LeavesController::class, 'index']);
Route::get('/leave/{id}', [App\Http\Controllers\api\LeavesController::class, 'show']);
Route::post('/apply/leaves', [App\Http\Controllers\api\LeavesController::class, 'applyLeaves']);
Route::post('/leave/new', [App\Http\Controllers\api\LeavesController::class, 'store']);
Route::get('/leave/delete/{id}', [App\Http\Controllers\api\LeavesController::class, 'destroy']);
Route::post('/leaves/data/{from}/{to}/{id}', [App\Http\Controllers\api\LeavesController::class, 'leavesData']);
Route::get('/leaves/wbs/{employee}/{year}', [App\Http\Controllers\api\LeavesController::class, 'leavesWbs']);

///////////////////////////////////Attendances///////////////////////////////////////////////
Route::get('/attendances', [App\Http\Controllers\api\AttendanceController::class, 'index']);
Route::post('/attendance/new', [App\Http\Controllers\api\AttendanceController::class, 'store']);
