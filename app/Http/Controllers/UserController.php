<?php

namespace App\Http\Controllers;

use App\User;
use Auth;
use Bican\Roles\Models\Permission;
use Bican\Roles\Models\Role;
use Hash;
use Illuminate\Http\Request;
use Input;
use Validator;
use DB;

use App\Http\Traits\FileTrait;
use App\Models\Department;
use App\Models\JobTitle;
use App\Models\UserSetting;
use App\Models\Feed;
use App\Models\ProjectUpvote;
use App\Models\Reward;
use App\Models\UserFavorite;

class UserController extends Controller
{
    use FileTrait;
    /**
     * Get user current context.
     *
     * @return JSON
     */
    public function getMe()
    {
        $user = Auth::user();
        $user['fullname'] = $user['firstname'].' '.$user['lastname'];
        $user['role'] = $user
                        ->roles()
                        ->select(['slug', 'roles.id', 'roles.name'])
                        ->get();
        $user['departments'] = $user->departments()->get();
        $user['jobtitles'] = $user->job_titles()->get();
        $user['projects'] = $user->projects()->get();
        $user['todos'] = $user->todos()->get();
        $user['tasks'] = $user->tasks()->get();

        $user_projects = $user->user_projects()->withCount('votes')->get();
        $user['post_count'] = $user->user_projects()->count();
        $like_count = 0;
        foreach($user_projects as $item)
        {
            $like_count += $item->votes_count;
        }
        $user['like_count'] = $like_count;
        return response()->success($user);
    }

    /**
     * User Like
     *
     * @return JSON
     */
    public function postUserLike(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $like_id = $request['id'];

        $new_staus = 1;
        $db_item = UserFavorite::where(array('user_id'=>$user_id, 'like_id'=>$like_id))->get();
        if($db_item->count())
        {
            $new_staus = $db_item[0]->status ? 0 : 1;
            UserFavorite::where(array('user_id'=>$user_id, 'like_id'=>$like_id))->update(['status' => $new_staus]);
        }else{
            $new_obj = new UserFavorite();
            $new_obj->user_id = $user_id;
            $new_obj->like_id = $like_id;
            $new_obj->status = $new_staus;
            $new_obj->save();
        }
        return response()->success($new_staus);
    }

    /**
     * Get favorite user id list
     *
     * @param int
     *
     * @return JSON
     */
    public function getFavoriteIds()
    {
        $user = Auth::user();
        $user_id = $user->id;
        $db_result = UserFavorite::where(array('user_id'=>$user_id, 'status'=>1))->get(['like_id'])->toArray();
        $result = array_map(function($item){
            return $item['like_id'];
        },$db_result);
        return response()->success($result);
    }

    /**
     * Post feed
     *
     * @return JSON
     */
    public function postFeed(Request $request)
    {
        $user = Auth::user();
        $feed = $request['feed'];
        $feed_item = new Feed();
        $feed_item->user_id = $user->id;
        $feed_item->message = $feed;
        $feed_item->save();
        return response()->success('success');
    }

    /**
     * Get feeds
     *
     * @return JSON
     */
    public function getFeeds()
    {
        $feeds = Feed::with('user')->get()->take(30);
        return response()->success($feeds);
    }

    /**
     * Get upvotes
     *
     * @return JSON
     */
    public function getUpvote()
    {
        $user = Auth::user();
        $count = ProjectUpvote::where('user_id',$user->id)->count();
        return response()->success($count);
    }

    /**
     * Get all users chat users
     *
     * @return JSON
     */
    public function getAllChatUser(){
        $user = Auth::user();
        // $user_level = $user->roles()->first()->level;
        // $result = $user->belongsToMany('roles')->wherePivot('level', 1);

        $result = User::with('departments')->whereHas('roles',function($query){
          $query->where('level','>=',0);
        })
        // ->orHas('roles','=',0)
        ->where('users.email_verified','=',1)
        ->where('users.id','<>',$user->id)
        ->get([
          'id',
          'name',
          'active',
          'avatar',
          'firstname',
          'lastname'
        ]);

        return response()->success($result);
    }

    /**
     * Get User Setting
     *
     * @return JSON
     */
    public function getUserSetting(){
        $user = Auth::user();
        // $user_level = $user->roles()->first()->level;
        // $result = $user->belongsToMany('roles')->wherePivot('level', 1);

        $result = $user->setting()->get();

        return response()->success($result);
    }

    /**
     * Get User Setting
     *
     * @return boolean
     */
    public function postUserSetting(Request $request){

        $user = Auth::user();
        $user_id = $user->id;
        $data = $request['data'];
        $row_id = isset($data['id']) ? $data['id'] : null;

        if(is_null($row_id))
        {
            $user_setting = new UserSetting();
            $user_setting->user_id = $user_id;
        }else{
            $user_setting = UserSetting::find($row_id);
        }
        $user_setting->post         = $data['post']? 1 : 0;
        $user_setting->upvote       = $data['upvote']? 1 : 0;
        $user_setting->comment      = $data['comment']? 1 : 0;
        $user_setting->popular      = $data['popular']? 1 : 0;
        $user_setting->approved     = $data['approved']? 1 : 0;
        $user_setting->dismissed    = $data['dismissed']? 1 : 0;

        $user_setting->timestamps = false;

        if($user_setting->save())
            return response()->success('success');
        else
            return response()->success('fail');
    }

    /**
     * Get User Setting By ID
     *
     * @return JSON
     */
    public function getUserSettingById(Request $request){
        $user_id = $request['id'];
        $user = User::find($user_id);
        $result = $user->setting()->get();

        return response()->success($result);
    }

    /**
     * Get all users with same department permission
     *
     * @return JSON
     */
    public function getDepartmentUser(Request $request){
        $user = Auth::user();
        $user_dep = $user->departments()->get();

        $dep_id_arr = array();
        foreach($user_dep as $key => $value)
        {
            $dep_id_arr[] = ($value->p_dep_id == 0)?$value->id:$value->p_dep_id;
        }
        $depatment_arr = Department::whereIn('p_dep_id',$dep_id_arr)->get();
        foreach($depatment_arr as $key => $value)
        {
            $dep_id_arr[] = $value->id;
        }

        $result = User::with('departments')->whereHas('departments',function($query) use($dep_id_arr){
            $query->whereIn('departments.id',$dep_id_arr);
        })->where('users.id','<>',$user->id)->get();

        return response()->success($result);
    }

    /**
     * Get all users with same department permission
     *
     * @return JSON
     */
    public function getProjectManagers(Request $request){
        $user = Auth::user();
        $user_dep = $user->departments()->get();

        $result = User::with('roles','departments')->whereHas('roles',function($query){
            $query->where('roles.id','>=','4');
        })->where('users.id','<>',$user->id)->get();

        return response()->success($result);
    }

    /**
     * Get all users within filter option
     *
     * @return JSON
     */
    public function getFilterUsers(Request $request){
        $departments = $request['departments'];
        $roles = $request['roles'];
        $depIds = explode(",", $departments);
        $roleIds = explode(",", $roles);

        $sub_dep_ids = Department::whereIn('p_dep_id',$depIds)->get(['id'])->toArray();
        $dep_ids = array_map(function($v){return $v['id'];},$sub_dep_ids);
        $dep_ids = array_merge($depIds, $dep_ids);

        $users = User::with(array('departments','roles','job_titles'));
        if($departments)
        {
            $users = $users->whereHas('departments',function($query) use($dep_ids){
                $query->whereIn('departments.id',$dep_ids);
            });
        }

        if($roles)
        {
            $users = $users->whereHas('roles',function($query) use($roleIds){
                $query->whereIn('roles.id',$roleIds)->where('roles.level','>',0);
            });
        }else{
            $users = $users->whereHas('roles',function($query) use($roleIds){
                $query->where('roles.level','>',0);
            });
        }
        $users = $users->get();

        return response()->success($users);
    }

    /**
     * Get all users activities
     *
     * @return JSON
     */
    public function getUserActivities(Request $request){

        $user_id = $request['id'];
        $user = User::find($user_id);

        $rewards = self::allRewards();

        $projectList = $user->user_projects()->orderby('created_at','desc')->get()->toArray();
        $upvoteList = $user->user_upvote()->orderby('created_at','desc')->get()->toArray();
        $commentList = $user->user_comment()
            ->with(array('project'=>function($query) use($user_id){
                $query->where('creator_id','<>',$user_id);
            }))->orderby('created_at','desc')->get()->toArray();

        $upvotedList = $user->user_projects()
            ->with(array('votes.user'=>function($query) use($user_id){
                $query->where('id','<>',$user_id);
            }))->get()->toArray();
        $commentedList = $user->user_projects()
            ->with(array('comments.user'=>function($query) use($user_id){
                $query->where('id','<>',$user_id);
            }))->get()->toArray();

        $projectList = array_map(function($item) use($rewards){
            $item['activity_type'] = 'post.create';
            $item['point'] = $rewards['post.create'];
            return $item;
        },$projectList);

        $upvoteList = array_map(function($item) use($rewards){
            $item['activity_type'] = 'post.like';
            $item['point'] = $rewards['post.like'];
            return $item;
        },$upvoteList);

        $commentList = array_filter($commentList, function($item){
            return $item['project'] == null ? false: true;
        });

        $commentList = array_map(function($item) use($rewards){
            $item['activity_type'] = 'comment.new';
            $item['point'] = $rewards['comment.new'];
            $item['title'] = $item['project']['title'];
            return $item;
        },$commentList);

        $upvotedListFinal = [];
        foreach($upvotedList as $item){
            foreach($item['votes'] as $user_item)
            {
                if($user_item['user_id'] != $user_id)
                {
                    $tmp = $item;
                    $tmp['votes'] = null;
                    $tmp['user'] = $user_item;
                    $tmp['activity_type'] = 'post.liked';
                    $tmp['point'] = $rewards['post.liked'];
                    $tmp['created_at'] = $user_item['created_at'];
                    $upvotedListFinal[] = $tmp;
                }
            }
        }

        $commentedListFinal = [];
        foreach($commentedList as $item){
            foreach($item['comments'] as $user_item)
            {
                if($user_item['user_id'] != $user_id)
                {
                    $tmp = $item;
                    $tmp['comments'] = null;
                    $tmp['comment'] = $user_item['comment'];
                    $tmp['user'] = $user_item;
                    $tmp['activity_type'] = 'comment.get';
                    $tmp['point'] = $rewards['comment.get'];
                    $tmp['created_at'] = $user_item['created_at'];
                    $commentedListFinal[] = $tmp;
                }
            }
        }


        $activities = array_merge($projectList, $upvoteList, $commentList, $upvotedListFinal, $commentedListFinal);
        $activities = array_map(function($item){
            if(isset($item['title']))
                $item['title'] = strlen($item['title']) > 50 ? substr($item['title'],0,50).'...' : $item['title'];
            if(isset($item['description']))
                $item['description'] = strlen($item['description']) > 150 ? substr($item['description'],0,150).'...' : $item['description'];
            if(isset($item['comment']))
                $item['comment'] = strlen($item['comment']) > 150 ? substr($item['comment'],0,150).'...' : $item['comment'];
            return $item;
        }, $activities);
        usort($activities, function($a,$b){
            return $a['created_at'] == $b['created_at']? 0 : ($a['created_at'] < $b['created_at']? 1: -1);
        });

        return response()->success($activities);
    }

    /**
     * Get User Point
     *
     * @return JSON
     */
    public function getUserPoint(Request $request){

        $user_id = $request['id'];
        $user = User::find($user_id);

        $point = 0;
        $rewards = self::allRewards();

        $projectCount = $user->user_projects()->count();
        $upvoteCount = $user->user_upvote()->count();
        $upvotedList = $user->user_projects()
            ->withCount(array('votes'=>function($query) use($user_id){
                $query->where('user_id','<>',$user_id);
            }))->get()->toArray();

        $commentList = $user->user_comment()
            ->with(array('project'=>function($query) use($user_id){
                $query->where('creator_id','<>',$user_id);
            }))->orderby('created_at','desc')->get()->toArray();

        $commentedList = $user->user_projects()
            ->withCount(array('comments'=>function($query) use($user_id){
                $query->where('user_id','<>',$user_id);
            }))->get()->toArray();

        $upvotedCount = array_reduce($upvotedList,function($sum, $item){
            return $sum + $item['votes_count'];
        },0);

        $commentCount = array_reduce($commentList,function($sum, $item){
            return $item['project'] == null ? $sum : $sum + 1;
        },0);

        $commentedCount = array_reduce($commentedList,function($sum, $item){
            return $sum + $item['comments_count'];
        },0);

        $point = $projectCount*$rewards['post.create'] + $upvoteCount*$rewards['post.like'] + $commentCount*$rewards['comment.new']+ $upvotedCount * $rewards['post.liked'] + $commentedCount * $rewards['comment.get'];
        return response()->success($point);
    }
    private function allRewards(){
        $rewards = Reward::all()->toArray();
        $result = [];
        foreach($rewards as $item)
        {
            $result[$item['type']] = $item['point'];
        }
        return $result;
    }


    /**
     * Create  new User.
     *
     * @return JSON
     */

    public function postUser(Request $request)
    {

        $this->validate($request, [
            'firstname'       => 'required|min:2',
            'lastname'       => 'required|min:2',
            'name'       => 'required|min:3|unique:users',
            'email'      => 'required|email|unique:users',
            'password'   => 'min:8',
        ]);

        $active = $request['active'] ? '1' : '0';

        $user = new User();
        $user->firstname = trim($request->firstname);
        $user->lastname = trim($request->lastname);
        $user->name = trim($request->name);
        $user->email = trim(strtolower($request->email));
        $user->password = bcrypt($request->password);
        $user->email_verified = 1;
        $user->active = $active;
        $user->save();
        $user_id = $user->id;

        $userSetting = new UserSetting();
        $userSetting->user_id = $user_id;
        $userSetting->save();

        $departments = $request['department'];
        $roles = $request['role'];
        $jobtitles = $request['jobtitle'];

        $dep_data = array_map(function($dep_item) use ($user_id){
            return ['user_id'=>$user_id,'department_id'=>$dep_item['id']];
        }, $departments);

        DB::table('department_user')->insert($dep_data);

        $job_data = array_map(function($item) use ($user_id){
            return ['user_id'=>$user_id,'job_id'=>$item['id']];
        }, $jobtitles);

        DB::table('user_job')->insert($job_data);

        foreach($roles as $role)
            $user->attachRole($role['id']);
        return response()->success('success');
    }
    public function postUpdateAvatar(Request $request)
    {
        $img = $request['data'];
        $user = Auth::user();
        $user_id = $user->id;
        $avatar_url = $this->base64_to_png($img, $user_id);
        $user->avatar = $avatar_url;
        $user->save();

        return response()->success('success');
    }

    public function getDepartmentUsers(Request $request)
    {
        $id = $request['id'];
        $sub_dep_ids = Department::where('p_dep_id',$id)->get(['id'])->toArray();
        $dep_ids = array_map(function($v){return $v['id'];},$sub_dep_ids);
        $dep_ids[] = $id;

        $users = User::with('departments')->whereHas('departments',function($query) use($dep_ids){
            $query->whereIn('departments.id',$dep_ids);
        })->get();
        return response()->success($users);
    }

    public function getDepartmentsUsers(Request $request)
    {
        $departments = $request['departments'];
        $ids = explode(",", $departments);

        $sub_dep_ids = Department::whereIn('p_dep_id',$ids)->get(['id'])->toArray();
        $dep_ids = array_map(function($v){return $v['id'];},$sub_dep_ids);
        $dep_ids = array_merge($ids, $dep_ids);

        $users = User::with('departments')->whereHas('departments',function($query) use($dep_ids){
            $query->whereIn('departments.id',$dep_ids);
        })->get();
        return response()->success($users);
    }

    public function postUserUpdate(Request $request)
    {
        $user_id = $request['id'];
        $this->validate($request, [
            'firstname'       => 'required|min:2',
            'lastname'       => 'required|min:2',
            'name'       => 'required|min:3|unique:users,name,'.$user_id,
            'email'      => 'required|email|unique:users,email,'.$user_id
        ]);
        $active = $request['active'] ? '1' : '0';

        $user = User::find($user_id);
        $user->firstname = trim($request->firstname);
        $user->lastname = trim($request->lastname);
        $user->name = trim($request->name);
        $user->email = trim(strtolower($request->email));
        $user->email_verified = 1;
        $user->active = $active;
        $user->save();

        $departments = $request['department'];
        $roles = $request['role'];
        $jobtitles = $request['jobtitle'];

        $dep_data = array_map(function($dep_item) use ($user_id){
            return ['user_id'=>$user_id,'department_id'=>$dep_item['id']];
        }, $departments);

        $job_data = array_map(function($item) use ($user_id){
            return ['user_id'=>$user_id,'job_id'=>$item['id']];
        }, $jobtitles);

        DB::table('department_user')->where('user_id','=',$user_id)->delete();
        DB::table('department_user')->insert($dep_data);
        DB::table('user_job')->where('user_id','=',$user_id)->delete();
        DB::table('user_job')->insert($job_data);

        $user->detachAllRoles();
        foreach($roles as $role)
        {
            $user->attachRole($role['id']);
        }
        return response()->success('success');
    }

    public function postUpdateMe(Request $request)
    {
        $user = Auth::user();

        $user_id = $user->id;

        $user->firstname = trim($request->firstname);
        $user->lastname = trim($request->lastname);
        $user->name = trim($request->name);
        $user->about_me = trim($request->about_me);
        $user->email = trim(strtolower($request->email));
        $user->save();

        $departments = $request['department'];
        $dep_data = array_map(function($dep_item) use ($user_id){
            return ['user_id'=>$user_id,'department_id'=>$dep_item['id']];
        }, $departments);
        DB::table('department_user')->where('user_id','=',$user_id)->delete();
        DB::table('department_user')->insert($dep_data);

        return response()->success('success');
    }

    public function postUpdatePassword(Request $request)
    {
        $user = Auth::user();

        if ($request->has('current_password')) {
            Validator::extend('hashmatch', function ($attribute, $value, $parameters) {
                return Hash::check($value, Auth::user()->password);
            });

            $rules = [
                'current_password' => 'required|hashmatch:current_password',
                'password' => 'required|min:8|confirmed',
                'password_confirmation' => 'required|min:8',
            ];

            $payload = app('request')->only('current_password', 'password', 'password_confirmation');

            $messages = [
                'hashmatch' => 'Invalid Password',
            ];

            $validator = app('validator')->make($payload, $rules, $messages);

            if ($validator->fails()) {
                return response()->error($validator->errors());
            } else {
                $user->password = Hash::make($request['password']);
            }
        }

        $user->save();

        return response()->success('success');
    }
    /**
     * Update user current context.
     *
     * @return JSON success message
     */
    public function putMe(Request $request)
    {
        $user = Auth::user();

        $this->validate($request, [
            'data.name' => 'required|min:3',
            'data.email' => 'required|email|unique:users,email,'.$user->id,
        ]);

        $userForm = app('request')
                    ->only(
                        'data.current_password',
                        'data.new_password',
                        'data.new_password_confirmation',
                        'data.name',
                        'data.email'
                    );

        $userForm = $userForm['data'];
        $user->name = $userForm['name'];
        $user->email = $userForm['email'];

        if ($request->has('data.current_password')) {
            Validator::extend('hashmatch', function ($attribute, $value, $parameters) {
                return Hash::check($value, Auth::user()->password);
            });

            $rules = [
                'data.current_password' => 'required|hashmatch:data.current_password',
                'data.new_password' => 'required|min:8|confirmed',
                'data.new_password_confirmation' => 'required|min:8',
            ];

            $payload = app('request')->only('data.current_password', 'data.new_password', 'data.new_password_confirmation');

            $messages = [
                'hashmatch' => 'Invalid Password',
            ];

            $validator = app('validator')->make($payload, $rules, $messages);

            if ($validator->fails()) {
                return response()->error($validator->errors());
            } else {
                $user->password = Hash::make($userForm['new_password']);
            }
        }

        $user->save();

        return response()->success('success');
    }

    /**
     * Get all users.
     *
     * @return JSON
     */
    public function getIndex()
    {
        $users = User::with('departments','roles','job_titles')->get();
        foreach($users as &$user)
        {
          $user->fullname = $user->firstname . ' ' . $user->lastname;
        }

        return response()->success($users);
    }

    /**
     * Get user details referenced by id.
     *
     * @param int User ID
     *
     * @return JSON
     */
    public function getShow(Request $request)
    {
        $id = $request['id'];
        $authUser = Auth::user();
        $current_user_id = $authUser->id;

        $user = User::find($id);
        $user['fullname'] = $user['firstname'].' '.$user['lastname'];
        $user['role'] = $user
                        ->roles()
                        ->select(['slug', 'roles.id', 'roles.name'])
                        ->get();
        $user['departments'] = $user->departments()->get();
        $user['jobtitles'] = $user->job_titles()->get();
        $user['projects'] = $user->projects()->get();
        $user['projects'] = $user->projects()->get();

        $user_projects = $user->user_projects()->withCount('votes')->get();
        $user['post_count'] = $user->user_projects()->count();
        $like_count = 0;
        foreach($user_projects as $item)
        {
            $like_count += $item->votes_count;
        }
        $user['like_count'] = $like_count;

        $db_result = UserFavorite::where(array('user_id'=>$current_user_id,'like_id'=>$id, 'status'=>1))->get();
        $is_favorite = $db_result->count() ? 1 : 0;
        $user['is_favorite'] = $is_favorite;

        return response()->success($user);
    }

    /**
     * Update user data.
     *
     * @return JSON success message
     */
    public function putShow(Request $request)
    {
        $userForm = array_dot(
            app('request')->only(
                'data.name',
                'data.email',
                'data.id'
            )
        );

        $userId = intval($userForm['data.id']);

        $user = User::find($userId);

        $this->validate($request, [
            'data.id' => 'required|integer',
            'data.name' => 'required|min:3',
            'data.email' => 'required|email|unique:users,email,'.$user->id,
        ]);

        $userData = [
            'name' => $userForm['data.name'],
            'email' => $userForm['data.email'],
        ];

        $affectedRows = User::where('id', '=', $userId)->update($userData);

        $user->detachAllRoles();

        foreach (Input::get('data.role') as $setRole) {
            $user->attachRole($setRole);
        }

        return response()->success('success');
    }

    /**
     * Delete User Data.
     *
     * @return JSON success message
     */
    public function deleteUser($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->success('success');
    }

    /**
     * Get all user roles.
     *
     * @return JSON
     */
    public function getRoles()
    {
        $roles = Role::where('level','<>',0)->orderby('level','asc')->get();

        return response()->success(compact('roles'));
    }

    /**
     * Get role details referenced by id.
     *
     * @param int Role ID
     *
     * @return JSON
     */
    public function getRolesShow($id)
    {
        $role = Role::find($id);

        $role['permissions'] = $role
                        ->permissions()
                        ->select(['permissions.name', 'permissions.id'])
                        ->get();

        return response()->success($role);
    }

    /**
     * Update role data and assign permission.
     *
     * @return JSON success message
     */
    public function putRolesShow()
    {
        $roleForm = Input::get('data');
        $roleData = [
            'name' => $roleForm['name'],
            'slug' => $roleForm['slug'],
            'description' => $roleForm['description'],
        ];

        $roleForm['slug'] = str_slug($roleForm['slug'], '.');
        $affectedRows = Role::where('id', '=', intval($roleForm['id']))->update($roleData);
        $role = Role::find($roleForm['id']);

        $role->detachAllPermissions();

        foreach (Input::get('data.permissions') as $setPermission) {
            $role->attachPermission($setPermission);
        }

        return response()->success('success');
    }

    /**
     * Create new user role.
     *
     * @return JSON
     */
    public function postRoles()
    {
        $role = Role::create([
            'name' => Input::get('role'),
            'slug' => str_slug(Input::get('slug'), '.'),
            'description' => Input::get('description'),
        ]);

        return response()->success(compact('role'));
    }

    /**
     * Delete user role referenced by id.
     *
     * @param int Role ID
     *
     * @return JSON
     */
    public function deleteRoles($id)
    {
        Role::destroy($id);

        return response()->success('success');
    }

    /**
     * Get all system permissions.
     *
     * @return JSON
     */
    public function getPermissions()
    {
        $permissions = Permission::all();

        return response()->success(compact('permissions'));
    }

    /**
     * Create new system permission.
     *
     * @return JSON
     */
    public function postPermissions()
    {
        $permission = Permission::create([
            'name' => Input::get('name'),
            'slug' => str_slug(Input::get('slug'), '.'),
            'description' => Input::get('description'),
        ]);

        return response()->success(compact('permission'));
    }

    /**
     * Get system permission referenced by id.
     *
     * @param int Permission ID
     *
     * @return JSON
     */
    public function getPermissionsShow($id)
    {
        $permission = Permission::find($id);

        return response()->success($permission);
    }

    /**
     * Update system permission.
     *
     * @return JSON
     */
    public function putPermissionsShow()
    {
        $permissionForm = Input::get('data');
        $permissionForm['slug'] = str_slug($permissionForm['slug'], '.');
        $affectedRows = Permission::where('id', '=', intval($permissionForm['id']))->update($permissionForm);

        return response()->success($permissionForm);
    }

    /**
     * Delete system permission referenced by id.
     *
     * @param int Permission ID
     *
     * @return JSON
     */
    public function deletePermissions($id)
    {
        Permission::destroy($id);

        return response()->success('success');
    }
}
