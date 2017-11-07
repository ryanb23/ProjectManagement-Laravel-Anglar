<?php

// use Illuminate\Foundation\Auth\User as Authenticatable;

namespace App;

use Bican\Roles\Contracts\HasRoleAndPermission as HasRoleAndPermissionContract;
use Bican\Roles\Traits\HasRoleAndPermission;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;

use Bican\Roles\Models\Role;
use App\Models\Message;
use App\Models\Department;
use App\Models\Project;
use App\Models\ProjectUpvote;
use App\Models\ProjectComment;
use App\Models\TodoList;
use App\Models\Task;
use App\Models\UserSetting;
use App\Models\UserFavorite;
use App\Models\JobTitle;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract, HasRoleAndPermissionContract
{
    use Authenticatable, CanResetPassword, HasRoleAndPermission;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'avatar', 'firstname', 'lastname', 'oauth_provider', 'oauth_provider_id',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'oauth_provider_id', 'oauth_provider',
    ];

    public function messages(){
        return $this->hasMany(Message::class);
    }

    public function roles(){
       return $this->belongsToMany(Role::class, 'role_user','user_id','role_id');
    }
    public function departments(){
        return $this->belongsToMany(Department::class, 'department_user','user_id','department_id');
    }

    public function projects(){
        return $this->belongsToMany(Project::class, 'project_users','user_id','project_id');
    }

    public function user_projects(){
        return $this->hasMany(Project::class, 'creator_id');
    }

    public function user_upvote(){
        return $this->belongsToMany(Project::class, 'project_upvotes','user_id','project_id');
    }

    public function user_comment(){
        return $this->hasMany(ProjectComment::class, 'user_id');
    }

    public function todos(){
        return $this->hasMany(TodoList::class, 'pm_id');
    }

    public function tasks(){
        return $this->hasMany(Task::class, 'contributor_id');
    }

    public function user_likes(){
        return $this->hasMany(UserFavorite::class, 'user_id');
    }

    public function job_titles(){
        return $this->belongsToMany(JobTitle::class, 'user_job','user_id','job_id');
    }

    public function setting(){
        return $this->hasOne(UserSetting::class, 'user_id');
    }
}
