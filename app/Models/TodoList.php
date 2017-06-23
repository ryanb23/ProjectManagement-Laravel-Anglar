<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class TodoList extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'project_id', 'description', 'pm_id', 'creator_at', 'udpdated_at'
    ];

    public function tasks(){
    	return $this->hasMany(Task::class,'todo_list_id');
    }
}
