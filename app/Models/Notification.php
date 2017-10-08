<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Notification extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sender_id', 'to_id','resource_id','notification_type','is_read'
    ];

    public function sender()
    {
      return $this->belongsTo(User::class,'sender_id');
    }
}
