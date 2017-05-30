<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Department;

class DepartmentController extends Controller
{
    public function getIndex()
    {
      return Department::with('subdepartment','departmentpermission')->get();
    }
}
