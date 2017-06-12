<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubDepartment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'p_dep_id', 'role', 'name', 'active'
    ];

    public function department()
    {
        return $this->belongsTo(Department::class, 'p_dep_id', 'id');
    }
}
