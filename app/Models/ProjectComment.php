<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\User;
use App\Models\Project;
class ProjectComment extends Model
{
    protected $fillable = [
      'user_id','project_id','message','created_at','updated_at'
    ];

    public function user()
    {
      return $this->belongsTo(User::class);
    }

    public function project()
    {
      return $this->belongsTo(Project::class);
    }
}
