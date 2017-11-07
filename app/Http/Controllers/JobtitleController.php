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

use App\Models\JobTitle;

class JobtitleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JSON success message
     */

    public function getIndex()
    {
        $jobtitles = JobTitle::get();
        return response()->success($jobtitles);
    }

    /**
     * Upsert JotTitle
     *
     * @return JSON success message
     */
    public function postJobTitle(Request $request)
    {
        $id = $request['id'];
        $jobTitle = null;
        if($id == null)
            $jobTitle = new JobTitle();
        else {
            $jobTitle = JobTitle::find($id);
        }
        $jobTitle->title = $request['title'];
        $jobTitle->desc = $request['desc'];
        $jobTitle->save();
        $jobTitles = JobTitle::get();
        return response()->success($jobTitles);
    }

    /**
     * Delete JotTitle
     *
     * @return JSON success message
     */
    public function deleteJobTitle($id)
    {
        $jobTitle = JobTitle::find($id);
        $jobTitle->delete();
        $jobTitles = JobTitle::get();
        return response()->success($jobTitles);
    }
}
