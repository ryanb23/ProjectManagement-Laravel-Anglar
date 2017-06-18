<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use Auth;
use Bican\Roles\Models\Permission;
use Bican\Roles\Models\Role;
use Hash;
use Input;
use Validator;
use DB;

use App\Models\Project;

class ProjectController extends Controller
{
    public function getIndex()
    {
        $projects = Project::orderBy('created_at','desc')->get();
        return response()->success($projects);
    }

    public function getByDateGroup(){
        $db_result = Project::orderBy('created_at','desc')->get();

        $projects = array();
        foreach($db_result as $db_item)
        {
            $date = explode(" ",$db_item->created_at);
            $date = $date[0];
            $projects[$date][] = $db_item;

        }
        return response()->success($projects);
    }
    public function getProject()
    {

    }
    public function postStore()
    {

    }
}
