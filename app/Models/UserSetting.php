<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
    protected $fillable = [
        'user_id', 'post', 'upvote', 'comment', 'popular', 'approved', 'dismissed'
    ];
}
