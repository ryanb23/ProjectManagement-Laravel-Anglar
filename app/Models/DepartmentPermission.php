<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentPermission extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'dep_id', 'restricted_dep_id'
  ];

  public function department()
  {
      return $this->belongsTo(Department::class, 'dep_id', 'id');
  }
}
