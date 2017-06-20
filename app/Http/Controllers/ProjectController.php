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
use App\Http\Traits\CustomTrait;

class ProjectController extends Controller
{
    use FileTrait;
    use CustomTrait;

    public function getIndex()
    {
        $projects = Project::orderBy('created_at','desc')->skip(0)->take(10)->get();
        return response()->success($projects);
    }

    public function imageUpload(Request $request){
        $result =  $this->fileToTmp($_FILES);
        return response()->success($result);
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
            $status = isset($request->value)?  $request->value :  'opened';
            switch($status)
            {
                case 'opened':
                    $status = 0;
                    break;
                case 'approved':
                    $status = 1;
                    break;
                case 'dismissed':
                    $status = 2;
                    break;
            }
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
    public function getProject(Request $request)
    {
        $projectId = $request['id'];
        $projectDetail = Project::with(['file','label','department'])->find($projectId);
        $projectDetail['ago_time'] = $this->time_elapsed_string($projectDetail['created_at']);
        return response()->success($projectDetail);
    }

    public function postStatusUpdate(Request $request){
        $projectId = $request['id'];
        $status = $request['status'];
        $project = Project::find($projectId);
        switch($status)
        {
            case 'opened':
                $status = 0;break;
            case 'approved':
                $status = 1;break;
            case 'dismissed':
                $status = 2;break;
            default:
                $status = 0;break;
        }
        $project->status = $status;
        $project->save();
        return response()->success('success');
    }
    public function postStore(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $project = new Project();
        $project->title = trim($request->title);
        $project->objective = trim($request->objective);
        $project->description = trim($request->description);
        $project->creator_id  = $user->id;
        $project->department_id  = $request->departments['id'];
        $project->save();
        $project_id = $project->id;

        $label_data = array_map(function($label) use ($project_id){
            return array(
                'project_id'=>$project_id,
                'label_id'=>$label['id'],
            );
        }, $request->labels);

        DB::table('project_label')->insert($label_data);

        $contributor_data = array_map(function($contributor) use ($project_id){
            return array(
                'project_id'=>$project_id,
                'contributor_id'=>$contributor['id'],
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            );
        }, $request->contributors);

        DB::table('project_contributors')->insert($contributor_data);

        $file_arr = $this->fileUpload($project_id,$request->newfiles);

        $file_data = array_map(function($file) use ($project_id,$user_id){
            return array(
                'project_id' => $project_id,
                'uploader_id' => $user_id,
                'filename' => $file['filename'],
                'org_filename' => $file['org_filename'],
                'filetype' => $file['type'],
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            );
        }, $file_arr);

        DB::table('project_files')->insert($file_data);
        return response()->success('success');
    }
}
