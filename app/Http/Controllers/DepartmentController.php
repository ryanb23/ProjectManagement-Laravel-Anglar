<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Department;

class DepartmentController extends Controller
{
    public function getIndex()
    {
        return response()->success(self::getAllDepartment());
    }

    public function getDepartmentGroup(){
        $departmentGroup = Department::with('p_department')->get();
        return response()->success($departmentGroup);
    }

    public function postNewDepartment(Request $request){
      $p_dep_id = $request['p_dep'];
      $active = $request['active'] ? '1' : '0';
      Department::create(['p_dep_id'=>$p_dep_id,'name'=>$request['name'],'description'=>$request['des'],'active'=>$active]);
      return response()->success(self::getAllDepartment());
    }

    public function postUpdateDepartment(Request $request){
      $id = $request['id'];
      $p_dep_id = $request['p_dep'];
      $active = $request['active'] ? '1' : '0';

      $department = Department::find($id);
      $department->name = $request['name'];
      $department->description = $request['des'];
      $department->active = $request['active'];
      $department->p_dep_id = $p_dep_id;
      $department->save();

      return response()->success(self::getAllDepartment());
    }

    /**
     * Delete Department
     *
     * @return JSON success message
     */
    public function deleteDepartment($id)
    {
        $department = Department::find($id);
        $department->delete();
        return response()->success('success');
    }

    private function getAllDepartment(){

      $departmentList = array();
      $db_result = Department::with('departmentpermission')->get()->toArray();
      foreach($db_result as $value1)
      {
        if($value1['p_dep_id'] == 0)
          $departmentList[] = $value1;
        else
          continue;
        foreach($db_result as $value2){
          if($value1['id'] == $value2['p_dep_id'])
            $departmentList[] = $value2;
        }
      }
      return $departmentList;
    }
}
