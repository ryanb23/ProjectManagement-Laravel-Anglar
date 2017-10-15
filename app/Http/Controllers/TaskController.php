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
use \Config;
use DB;

use App\Events\NotificationEvent;

use App\Models\Task;
use App\Http\Traits\FileTrait;
use App\Http\Traits\CustomTrait;

class TaskController extends Controller
{
    use CustomTrait;
    use FileTrait;

    public function getIndex(Request $request)
    {
        return response()->success('success');
    }

    public function getList(Request $request)
    {
        $todo_id = $request['id'];
        $result = Task::with('department','contributor','file')->where('todo_list_id',$todo_id)->get();
        return response()->success($result);
    }

    public function postSubmit(Request $request){
        $task_id = $request['id'];
        $project_id = $request['project_id'];
        $user = Auth::user();
        $user_id = $user->id;

        $task = Task::find($task_id);
        $task->submit_title = $request['title'];
        $task->submit_description = $request['description'];
        $task->is_submitted = 1;
        $task->save();

        $file_arr = $this->fileUpload($project_id,$request->newfiles);

        $file_data = array_map(function($file) use ($project_id,$user_id,$task_id){
            return array(
                'project_id' => $project_id,
                'task_id' => $task_id,
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
    public function postStore(Request $request)
    {
        $task_id = $request['id'];
        $todo_id = $request['todolist_id'];
        $user = Auth::user();
        $project_id = $request['project_id'];
        if($task_id == null)
            $newTask = new Task();
        else
            $newTask = Task::find($task_id);
        $newTask->title = $request['title'];
        $newTask->description = $request['description'];
        $newTask->deadline = $request['deadline'];
        $newTask->assign_type = $request['assign_type'];
        $newTask->todo_list_id = $todo_id;
        $newTask->department_id = $request['department_id'];
        $newTask->contributor_id = $request['contributor_id'];
        $result = 'success';
        if(!$newTask->save())
            $result = 'false';

        $notificaiton_user_ids = array($request['contributor_id']);
        event(new NotificationEvent($user->id, Config::get("custom.notification_new_task"), $project_id, $notificaiton_user_ids));

        return response()->success($result);
    }

    public function postApprove(Request $request)
    {
        $task_id = $request['id'];
        $is_approved = $request['is_approved'];
        $task = Task::find($task_id);
        $task->is_approved = $is_approved;
        $result = 'success';
        if(!$task->save())
            $result = 'false';
        return response()->success($result);

    }
    public function deleteTask($id){
        $task = Task::find($id);
        $task->delete();
        return response()->success('success');
    }
}
