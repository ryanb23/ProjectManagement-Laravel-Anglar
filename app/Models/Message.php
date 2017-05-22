<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Message extends Model
{
    protected $fillable = [
      'user_id','to_id','message','is_read'
    ];

    //
    public function user()
    {
      return $this->belongsTo(User::class);
    }
    public function to_user(){
      return User::find($this->to_id);
    }
}
