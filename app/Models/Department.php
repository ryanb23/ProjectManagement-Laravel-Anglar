<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Project;
use App\User;

class Department extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'active', 'p_dep_id', 'created_at', 'updated_at'
    ];

    public function departmentpermission(){
        return $this->hasMany(DepartmentPermission::class,'dep_id','id');
    }

    public function p_department(){
        return $this->belongsto(Department::class,'p_dep_id');
    }

    public function child_department(){
        return $this->hasMany(Department::class,'p_dep_id');
    }

    public function users(){
        return $this->belongsToMany(User::class,'department_user','department_id','user_id');
    }

    public function user_count(){
        return $this->belongsToMany(User::class,'department_user','department_id','user_id')->selectRaw('department_id,user_id,count(*) as user_count')->groupBy('department_id');
    }

    public function project_count(){
        return $this->hasOne(Project::class,'department_id')->selectRaw('department_id,count(*) as project_count')->groupBy('department_id');
    }
}
