<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Department;
use App\Models\Project;

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

    public function getDepartmentTree(){

        $result = array();
        $result['countArr'] = array('all'=>0,'opened'=>0,'approved'=>0,'dismissed'=>0);
        $departmentTree = Department::with('child_department','departmentpermission','project_count','child_department.project_count')
            ->where('p_dep_id',0)
            ->get()->toArray();

        foreach($departmentTree as &$deprtmentItem)
        {
            $project_count = isset($deprtmentItem['project_count']['project_count']) ? $deprtmentItem['project_count']['project_count'] : 0;
            if(isset($deprtmentItem['child_department']))
            {
                foreach($deprtmentItem['child_department'] as $child_departmentItem)
                {
                    $project_count += isset($child_departmentItem['project_count']['project_count']) ? $child_departmentItem['project_count']['project_count'] : 0;
                }
            }
            if(!isset($deprtmentItem['project_count']['project_count']))
                $deprtmentItem['project_count'] = [];
            $deprtmentItem['project_count']['project_count'] = $project_count;
        }

        $countArr = Project::selectRaw('status,count(*) as project_count')->groupBy('status')->get();
        $result['treeData'] = $departmentTree;

        foreach($countArr as $item)
        {
            $status = 'opened';
            $status = $item->status == 1 ? 'approved' : $status;
            $status = $item->status == 2 ? 'dismissed' : $status;
            $result['countArr'][$status] = $item->project_count;
        }
        $result['countArr']['all'] = $result['countArr']['opened'] + $result['countArr']['approved'] + $result['countArr']['dismissed'];
        return response()->success($result);

    }

    public function getDepartmentTreeWithUsers(){

        $result = array();
        $departmentTree = Department::with('child_department','user_count','child_department.user_count')
            ->where('p_dep_id',0)
            ->get()->toArray();

        foreach($departmentTree as &$deprtmentItem)
        {
            $user_count = isset($deprtmentItem['user_count'][0]['user_count']) ? $deprtmentItem['user_count'][0]['user_count'] : 0;
            if(isset($deprtmentItem['child_department']))
            {
                foreach($deprtmentItem['child_department'] as $child_departmentItem)
                {
                    $user_count += isset($child_departmentItem['user_count'][0]['user_count']) ? $child_departmentItem['user_count'][0]['user_count'] : 0;
                }
            }
            if(!isset($deprtmentItem['user_count'][0]['user_count']))
                $deprtmentItem['user_count'][0] = [];
            $deprtmentItem['user_count'][0]['user_count'] = $user_count;
        }

        $result['treeData'] = $departmentTree;
        return response()->success($result);

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
