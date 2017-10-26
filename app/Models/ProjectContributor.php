<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectContributor extends Model
{
    public function departments(){
        return $this->belongsToMany(Department::class, 'department_user','user_id','department_id');
    }
}
