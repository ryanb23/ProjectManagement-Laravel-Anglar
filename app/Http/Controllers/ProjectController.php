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
use \Config;
use \Lang;

use App\Models\Project;
use App\Models\TodoList;
use App\Models\Department;
use App\Models\Label;
use App\Models\ProjectComment;
use App\Models\ProjectContributor;
use App\Models\UserSetting;

use App\Events\CommentPostEvent;

use App\Http\Traits\FileTrait;
use App\Http\Traits\CustomTrait;
use App\Http\Traits\NotificationTrait;

class ProjectController extends Controller
{
    use FileTrait;
    use CustomTrait;
    use NotificationTrait;

    public function getIndex()
    {
        $projects = Project::orderBy('created_at','desc')->skip(0)->take(10)->get();
        return response()->success($projects);
    }

    public function imageUpload(Request $request){
        $result =  $this->fileToTmp($_FILES);
        return response()->success($result);
    }

    public function postRemoveTmp(Request $request){
        $result = $this->removeFromTmp($request['filename']);
        return response()->success($result);
    }

    public function getUserProjects(Request $request)
    {
        $user_id = $request['id'];
        $user = User::find($user_id);
        $projectList = $user->user_projects()->with('department')->get();
        return response()->success($projectList);
    }

    public function getCommentList(Request $request)
    {
        $project_id = $request['id'];
        $commentList = ProjectComment::with('user','user.departments')->where('project_id',$project_id)->get();
        return response()->success($commentList);
    }

    /** get project relators **/
    public function getProjectRelators($param)
    {
        $project_id = $param['id'];
        $project_creator = Project::where('id',$project_id)->get(['creator_id as id'])->toArray();
        $project_contributors = ProjectContributor::where('project_id',$project_id)->get(['contributor_id as id'])->toArray();

        $projectRelators = array_merge($project_creator,$project_contributors);
        $projectRelators = array_map(function($v){return $v['id'];},$projectRelators);
        return array_values($projectRelators);
    }

    /** get comment notification users**/
    public function getCommentNotificationUsers($user_ids)
    {
        $result = User::whereHas('setting',function($query){
          $query->where('comment',1);
        })->whereIn('id',$user_ids)->get(['id'])->toArray();

        $result = array_map(function($v){return $v['id'];},$result);
        return array_values($result);
    }

    public function postComment(Request $request)
    {
        $this->validate($request, [
            'project_id'       => 'required|exists:projects,id',
            'comment'       => 'required'
        ]);
        $user = Auth::user();
        $user_id = $user->id;
        $project_id = $request['project_id'];
        $comment = $request['comment'];

        $newComment = new ProjectComment();
        $newComment->project_id = $project_id;
        $newComment->user_id = $user_id;
        $newComment->comment = $request['comment'];
        $newComment->save();
        $comment_id = $newComment->id;

        $created_at = $newComment->created_at;
        event(new CommentPostEvent($comment, $project_id, $created_at));
        $relator_ids = self::getProjectRelators(array('id'=>$project_id));
        $comment_notificaiton_user_ids = self::getCommentNotificationUsers($relator_ids);

        $this->createNotification($user->id, Config::get('custom.notification_project_comment'), $comment_id, $comment_notificaiton_user_ids);
        return response()->success($created_at);
    }
    public function getProgress(Request $request){
        $project_id = $request['id'];
        $todoList = Todolist::with('tasks')->where('project_id','=',$project_id)->get()->toArray();
        foreach($todoList as &$item)
        {
            $complete_cnt = 0;
            $task_cnt = count($item['tasks']);
            foreach($item['tasks'] as $task)
            {
                if($task['is_approved'] == 1)
                    $complete_cnt ++;
            }

            $item['progress'] = $task_cnt != 0 ? round(($complete_cnt / $task_cnt * 100),0) : 0;
            $item['task_cnt'] = $task_cnt;
            $item['task_completed_cnt'] = $complete_cnt;
        }
        return response()->success($todoList);
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
        return response()->success($projectDetail);
    }

    public function getMyProjects(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;

        $projects = Project::with(array('user'=>function($query){
            $query->select(['id','name','avatar','firstname','lastname']);
        },
        'user.departments' => function($query){
            $query->select();
        }))->where('projects.creator_id',$user_id)->orderBy('projects.created_at','desc')->get();
        return response()->success($projects);
    }

    public function getMyContributedProjects(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;

        $userProjectIds = ProjectContributor::where('contributor_id',$user_id)->get(['project_id as id'])->toArray();

        $projects = Project::with(array('user'=>function($query){
            $query->select(['id','name','avatar','firstname','lastname']);
        },
        'user.departments' => function($query){
            $query->select();
        }))->whereIn('projects.id',$userProjectIds)->orderBy('projects.created_at','desc')->get();
        return response()->success($projects);
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
    public function postUpdatePorjectManagers(Request $request){
        $id = $request['id'];
        $project_id = $request['project_id'];
        foreach($request['project_managers'] as $pm)
        {
            $row = DB::table('project_users')->where('project_id',$project_id)->where('user_id',$pm['id'])->get();
            if (count($row) == 0)
            {
                DB::table('project_users')->insert(['project_id'=>$project_id,'user_id'=>$pm['id']]);
            }

        }

        return response()->success('success');
    }

    public function getProjectManagers(Request $request){
        $id = $request['id'];
        $result = Project::with('manager')->where('projects.id',$id)->get();
        return response()->success($result);
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
