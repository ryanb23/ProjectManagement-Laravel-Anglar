<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use Auth;
use Bican\Roles\Models\Permission;
use Bican\Roles\Models\Role;
use Hash;
use Input;
use Validator;
use DB;

use App\Models\Project;
use App\Models\Department;
use App\Models\Label;

use App\Http\Traits\FileTrait;

class ProjectController extends Controller
{
    use FileTrait;

    public function getIndex()
    {
        $projects = Project::orderBy('created_at','desc')->get();
        return response()->success($projects);
    }

    public function imageUpload(Request $request){
        return response()->success($_FILES);
    }

    public function getByDateGroup(Request $request){
        $type = isset($request->type)?  $request->type :  'dep';
        if($type == 'dep')
        {
            $dep_id = isset($request->value)?  $request->value :  'all';
            $dep_id_arr = [$dep_id];
            $db_result = Project::with(array('user'=>function($query){
                    $query->select(['id','name','avatar','firstname','lastname']);
                },
                'user.departments' => function($query){
                    $query->select();
                }));
            if($dep_id != null && $dep_id != 'all')
            {
                $db_query = Department::with('child_department')->where('id',$dep_id)->get(['id']);
                foreach($db_query[0]->child_department as $key => $value)
                {
                    $dep_id_arr[] = $value->id;
                }
                $db_result = $db_result->whereIn('department_id',$dep_id_arr);
            }
            $db_result = $db_result->orderBy('created_at','desc')->get();
        }
        if($type == 'status')
        {
            $status = isset($request->value)?  $request->value :  'approved';
            $status = ($status == 'approved')? 1 : 0;
            $db_result = Project::with(array('user'=>function($query){
                    $query->select(['id','name','avatar','firstname','lastname']);
                },
                'user.departments' => function($query){
                    $query->select();
                }))->where('status',$status)->orderBy('created_at','desc')->get();
        }

        $projects = array();
        foreach($db_result as $db_item)
        {
            $date = explode(" ",$db_item->created_at);
            $date = $date[0];
            $projects[$date][] = $db_item;

        }
        return response()->success($projects);
    }
    public function getProject()
    {

    }
    public function postStore(Request $request)
    {
        $user = Auth::user();
        $project = new Project();
        $project->title = trim($request->title);
        $project->objective = trim($request->objective);
        $project->description = trim($request->description);
        $project->creator_id  = $user->id;
        $project->department_id  = $request->departments['id'];
        $project->save();
        $project_id = $project->id;

        $label_data = array_map(function($label) use ($project_id){
            return ['project_id'=>$project_id,'label_id'=>$label['id']];
        }, $request->labels);

        DB::table('project_label')->insert($label_data);

        $this->fileUpload($project_id,$request->files);
    }
}
