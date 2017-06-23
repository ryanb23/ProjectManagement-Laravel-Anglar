<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectFile extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'project_id', 'task_id', 'uploader_id', 'filename', 'org_filename', 'filetype', 'type', 'created_at', 'updated_at'
    ];
}
