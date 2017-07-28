<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Feed extends Model
{
    protected $fillable = [
      'user_id','message'
    ];

    //
    public function user()
    {
      return $this->belongsTo(User::class);
    }
}
