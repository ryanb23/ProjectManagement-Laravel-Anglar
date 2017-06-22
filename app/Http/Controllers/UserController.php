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

class UserController extends Controller
{

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
        $user['department'] = $user->departments()->get();
        return response()->success($user);
    }

    /**
     * Get all users chat users
     *
     * @return JSON
     */
    public function getAllChatUser(){
        $user = Auth::user();
        // $user_level = $user->roles()->first()->level;
        // $result = $user->belongsToMany('role')->wherePivot('level', 1);

        // $result = User::whereHas('roles',function($query){
        //   $query->where('level','>',0);
        // })
        // ->orHas('roles','=',0)
        // ->where('email_verified','=',1)
        // ->whereNotIn('id',[$user->id])
        // ->get([
        //   'id',
        //   'name',
        //   'active',
        //   'avatar',
        //   'firstname',
        //   'lastname'
        // ]);
        $result = User::whereNotIn('id',[$user->id])->get();

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
            $query->where('roles.id','=','4');
        })->where('users.id','<>',$user->id)->get();

        return response()->success($result);
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
        $departments = $request['department'];
        $roles = $request['role'];

        $dep_data = array_map(function($dep_item) use ($user_id){
            return ['user_id'=>$user_id,'department_id'=>$dep_item['id']];
        }, $departments);

        DB::table('department_user')->insert($dep_data);

        foreach($roles as $role)
            $user->attachRole($role['id']);
        return response()->success('success');
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

        $dep_data = array_map(function($dep_item) use ($user_id){
            return ['user_id'=>$user_id,'department_id'=>$dep_item['id']];
        }, $departments);

        DB::table('department_user')->where('user_id','=',$user_id)->delete();
        DB::table('department_user')->insert($dep_data);

        $user->detachAllRoles();
        foreach($roles as $role)
        {
            $user->attachRole($role['id']);
        }
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
        $users = User::with('departments','roles')->get();
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
    public function getShow($id)
    {
        $user = User::find($id);
        $user['role'] = $user
                        ->roles()
                        ->select(['slug', 'roles.id', 'roles.name'])
                        ->get();

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
