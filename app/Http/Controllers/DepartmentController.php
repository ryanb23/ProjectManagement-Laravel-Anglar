<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Department;
use App\Models\SubDepartment;

class DepartmentController extends Controller
{
    public function getIndex()
    {
      return response()->success(self::getAllDepartment());
    }

    public function getDepartmentList(){
      $sub_departmentList =  SubDepartment::with('department')->get();
      return response()->success($sub_departmentList);
    }

    public function postNewDepartment(Request $request){
      $p_dep_id = $request['p_dep'];
      $active = $request['active'] ? '1' : '0';
      if($p_dep_id == 0) // Department
      {
        Department::create(['name'=>$request['name'],'description'=>$request['des'],'active'=>$active]);
      }else{  // Sub Department
        SubDepartment::create(['p_dep_id'=>$p_dep_id,'name'=>$request['name'],'description'=>$request['des'],'active'=>$active]);
      }
      return response()->success(self::getAllDepartment());
    }

    private function getAllDepartment(){
      $departmentList = Department::with('subdepartment','departmentpermission')->get()->toArray();
      return $departmentList;
    }
}
