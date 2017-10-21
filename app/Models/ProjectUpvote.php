<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\User;

class ProjectUpvote extends Model
{
    protected $fillable = [
      'user_id','project_id','created_at','updated_at'
    ];

    public function user()
    {
      return $this->belongsTo(User::class);
    }
}
