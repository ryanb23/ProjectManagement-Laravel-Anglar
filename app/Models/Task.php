<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Department;
use App\User;

class Task extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'todo_list_id', 'title', 'is_submitted', 'is_approved', 'description', 'deadline', 'assign_type', 'contributor_id', 'department_id', 'created_at', 'udpdated_at'
    ];

    public function department(){
        return $this->belongsto(Department::class,'department_id');
    }

    public function contributor(){
        return $this->belongsto(User::class,'contributor_id');
    }

    public function file(){
        return $this->hasMany(ProjectFile::class,'task_id');
    }
}
