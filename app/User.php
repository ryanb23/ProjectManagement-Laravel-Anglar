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
}
