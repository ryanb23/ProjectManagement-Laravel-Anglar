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
        'name', 'description', 'active'
    ];

    public function subdepartment(){
        return $this->hasMany(SubDepartment::class,'p_dep_id','id');
    }

    public function departmentpermission(){
        return $this->hasMany(DepartmentPermission::class,'dep_id','id');
    }
}
