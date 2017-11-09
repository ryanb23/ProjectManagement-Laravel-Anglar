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
use App\Models\ProjectUpvote;

use App\Events\CommentPostEvent;
use App\Events\NotificationEvent;

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

    public function postRemoveTmp(Request $request){
        $result = $this->removeFromTmp($request['filename']);
        return response()->success($result);
    }

    public function postUpvote(Request $request){
        $project_id = $request['project_id'];
        $user = Auth::user();
        $upvote = ProjectUpvote::where(['user_id'=>$user->id, 'project_id'=>$project_id])->count();
        if(!$upvote)
        {
            $upvote = new ProjectUpvote();
            $upvote->user_id = $user->id;
            $upvote->project_id = $project_id;
            $upvote->save();
        }

        $relator_ids = self::getProjectRelators(array('id'=>$project_id));
        $comment_notificaiton_user_ids = self::getAllowedNotificationUsers('upvote',$relator_ids);

        event(new NotificationEvent($user->id, Config::get('custom.notification_project_upvote'), $project_id, $comment_notificaiton_user_ids));

        return response()->success('success');
    }

    public function postDownvote(Request $request){
        $project_id = $request['project_id'];
        $user = Auth::user();
        $upvote = ProjectUpvote::where(['user_id'=>$user->id, 'project_id'=>$project_id])->delete();

        return response()->success('success');
    }

    public function getUserProjects(Request $request)
    {
        $user_id = $request['id'];
        $user = User::find($user_id);
        $projectList = $user->user_projects()->with(array('department','votes','comments','file'))->get()->toArray();
        $projects = array();
        foreach($projectList as $db_item)
        {
            $item = $db_item;
            $item['vote_count'] = count($db_item['votes']);
            $item['comment_count'] = count($db_item['comments']);
            $projects[] = $item;
        }
        return response()->success($projects);
    }

    public function getCommentList(Request $request)
    {
        $project_id = $request['id'];
        $pagination = json_decode($request['pagination']);
        $commentList = ProjectComment::with('user','user.departments')
            ->where('project_id',$project_id);
        if($pagination->lastID)
            $commentList = $commentList->where('id','<',$pagination->lastID);
        $commentList = $commentList->orderBy('created_at','desc')->take($pagination->count)->get();
        return response()->success($commentList);
    }

    /** get project relators **/
    public function getProjectRelators($param)
    {
        $user = Auth::user();
        $user_id = $user->id;

        $project_id = $param['id'];
        $project_creator = Project::where('id',$project_id)->whereNotIn('creator_id',[$user_id])->get(['creator_id as id'])->toArray();
        $project_contributors = ProjectContributor::where('project_id',$project_id)->whereNotIn('contributor_id',[$user_id])->get(['contributor_id as id'])->toArray();

        $projectRelators = array_merge($project_creator,$project_contributors);
        $projectRelators = array_map(function($v){return $v['id'];},$projectRelators);
        return array_values($projectRelators);
    }


    /** get allowed notification users**/
    public function getAllowedNotificationUsers($type ,$user_ids)
    {
        $result = User::whereHas('setting',function($query) use($type){
          $query->where($type,1);
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
        $comment_notificaiton_user_ids = self::getAllowedNotificationUsers('comment',$relator_ids);

        event(new NotificationEvent($user->id, Config::get('custom.notification_project_comment'), $project_id, $comment_notificaiton_user_ids));
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
    public function getAll(Request $request){
        $user = Auth::user();
        $user_id = $user->id;
        $depParam = json_decode($request['depParam']);
        $pagination = json_decode($request['pagination']);
        $order = json_decode($request['order']);

        $type = isset($depParam->type)?  $depParam->type :  'dep';
        if($type == 'dep')
        {
            $dep_id = isset($depParam->value)?  $depParam->value :  'all';
            $dep_id_arr = [$dep_id];
            $db_result = Project::withCount(array('votes','comments'))->with(array('votes' => function($query){
                },
                'comments' => function($query){
                },
                'file' => function($query){
                },
                'user'=>function($query){
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
        }
        if($type == 'status')
        {
            $status = isset($depParam->value)?  $depParam->value :  'opened';
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
            $db_result = Project::withCount(array('votes','comments'))->with(array('votes' => function($query){
                },
                'comments' => function($query){
                },
                'file' => function($query){
                },
                'user'=>function($query){
                    $query->select(['id','name','avatar','firstname','lastname']);
                },
                'user.departments' => function($query){
                    $query->select();
                }))->where('status',$status);
        }
        if($order && $order->value == "by_likes")
        {
            $db_result = $db_result->orderBy('votes_count','desc');
        }else{
            $db_result = $db_result->orderBy('created_at','desc');
        }
        $db_result = $db_result->offset(($pagination->lastID-1) *$pagination->count)->limit($pagination->count)->get();

        $projects = array();
        foreach($db_result as $db_item)
        {
            $item = $db_item;
            $is_vote = $is_comment = false;
            foreach ($db_item['votes'] as $value) {
                if($value['user_id'] == $user_id)
                    $is_vote = true;
            }
            foreach ($db_item['comments'] as $value) {
                if($value['user_id'] == $user_id)
                    $is_comment = true;
            }
            $item['is_vote'] = $is_vote;
            $item['is_comment'] = $is_comment;
            $projects[] = $item;
        }

        return response()->success($projects);
    }

    public function getAllStatus(Request $request){
        $depParam = json_decode($request['depParam']);
        $result = array(
            "post_count" => 0,
            "like_count" => 0,
            "comment_count" => 0,
            "approved_count" => 0,
            "dismissed_count" => 0,
            "todays_count" => 0
        );
        $type = isset($depParam->type)?  $depParam->type :  'dep';
        if($type == 'dep')
        {
            $dep_id = isset($depParam->value)?  $depParam->value :  'all';
            $dep_id_arr = [$dep_id];
            $db_result = Project::withCount(array('votes','comments'));
            if($dep_id != null && $dep_id != 'all')
            {
                $db_query = Department::with('child_department')->where('id',$dep_id)->get(['id']);
                foreach($db_query[0]->child_department as $key => $value)
                {
                    $dep_id_arr[] = $value->id;
                }
                $db_result = $db_result->whereIn('department_id',$dep_id_arr);
            }
        }
        if($type == 'status')
        {
            $status = isset($depParam->value)?  $depParam->value :  'opened';
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
            $db_result = Project::withCount(array('votes','comments'))->where('status',$status);
        }
        $db_result = $db_result->get()->toArray();

        foreach($db_result as $item)
        {
            $result['post_count'] ++;
            $result['like_count'] += $item['votes_count'];
            $result['comment_count'] += $item['comments_count'];
            if($item['status'] == 1)
                $result['approved_count'] ++;
            if($item['status'] == 2)
                $result['dismissed_count'] ++;
            if(date('Ymd') == date('Ymd', strtotime($item['created_at'])))
                $result['todays_count'] ++;
        }

        return response()->success($result);
    }
    public function getProject(Request $request)
    {
        $projectId = $request['id'];
        $user = Auth::user();
        $projectDetail = Project::with(array('votes','comments','file','label','department',
            'contributor'=>function($query){
            },
            'contributor.departments' => function($query){
                $query->select();
            },
            'user'=>function($query){
                $query->select(['id','name','avatar','firstname','lastname']);
            },
            'user.departments' => function($query){
                $query->select();
            })
            )->find($projectId);
        $is_upvote = ProjectUpvote::where(['project_id'=>$projectId,'user_id'=>$user->id])->count();
        $projectDetail['is_upvote'] = $is_upvote;
        $projectDetail['vote_count'] = $projectDetail->votes->count();
        $projectDetail['comment_count'] = $projectDetail->comments->count();
        return response()->success($projectDetail);
    }

    public function getMyProjects(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;

        $projects = Project::with(array('votes','comments','user'=>function($query){
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

        $projects = Project::with(array('votes','comments','user'=>function($query){
            $query->select(['id','name','avatar','firstname','lastname']);
        },
        'user.departments' => function($query){
            $query->select();
        }))->whereIn('projects.id',$userProjectIds)->orderBy('projects.created_at','desc')->get();
        return response()->success($projects);
    }

    public function postStatusUpdate(Request $request){

        $user = Auth::user();
        $project_id = $request['id'];
        $status = $request['status'];
        $project = Project::find($project_id);
        $notification_type = null;
        $usersetting_type = null;
        switch($status)
        {
            case 'opened':
                $status = 0;
                break;
            case 'approved':
                $status = 1;
                $usersetting_type = 'approved';
                $notification_type = 'notification_project_approved';
                break;
            case 'dismissed':
                $usersetting_type = 'dismissed';
                $notification_type = 'notification_project_dismissed';
                $status = 2;
                break;
            default:
                $notification_type = null;
                $status = 0;break;
        }
        $project->status = $status;
        $project->save();

        if($notification_type)
        {
            $relator_ids = self::getProjectRelators(array('id'=>$project_id));
            $comment_notificaiton_user_ids = self::getAllowedNotificationUsers($usersetting_type,$relator_ids);

            event(new NotificationEvent($user->id, Config::get("custom.{$notification_type}"), $project_id, $comment_notificaiton_user_ids));
        }
        return response()->success('success');
    }
    public function postUpdateProjectManagers(Request $request){
        $id = $request['id'];
        $project_id = $request['project_id'];
        $user_ids = [];
        $user = Auth::user();

        foreach($request['project_managers'] as $pm)
        {
            $user_ids[] = $pm;
        }
        DB::table('project_users')->where('project_id',$project_id)->whereNotIn('user_id',$user_ids)->delete();
        foreach($request['project_managers'] as $pm)
        {
            $tmpObj = DB::table('project_users')->where(['project_id' => $project_id, 'user_id' => $pm['id']])->first();
            if(!$tmpObj)
            {
                DB::table('project_users')->insert(['project_id'=>$project_id,'user_id'=>$pm['id']]);
            }
        }

        $notificaiton_user_ids = array_map(function($v){return $v['id'];},$request['project_managers']);
        event(new NotificationEvent($user->id, Config::get("custom.notification_project_manager_assign"), $project_id, $notificaiton_user_ids));

        return response()->success('success');
    }

    public function getProjectManagers(Request $request){
        $id = $request['id'];
        $result = Project::with(['manager','manager.job_titles'])->where('projects.id',$id)->get();
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

    public function postUpdate(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $project_id = $request['id'];
        $project = Project::find($project_id);
        $project->title = trim($request->title);
        $project->objective = trim($request->objective);
        $project->description = trim($request->description);
        $project->creator_id  = $user->id;
        $project->department_id  = $request->departments['id'];
        $project->save();

        DB::table('project_label')->where('project_id','=',$project_id)->delete();
        $label_data = array_map(function($label) use ($project_id){
            return array(
                'project_id'=>$project_id,
                'label_id'=>$label['id'],
            );
        }, $request->labels);
        DB::table('project_label')->insert($label_data);

        DB::table('project_contributors')->where('project_id','=',$project_id)->delete();
        $contributor_data = array_map(function($contributor) use ($project_id){
            return array(
                'project_id'=>$project_id,
                'contributor_id'=>$contributor['id'],
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            );
        }, $request->contributors);
        DB::table('project_contributors')->insert($contributor_data);

        $old_file_arr = $request->newfiles['oldFiles'];
        $old_file_ids = array_map(function($file){
            return $file['id'];
        },$old_file_arr);
        DB::table('project_files')->where('project_id', $project_id)->whereNotIn('id',$old_file_ids)->delete();

        $file_arr = $this->fileUpload($project_id,$request->newfiles['newFiles']);
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
