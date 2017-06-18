<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'active', 'p_dep_id'
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
}
