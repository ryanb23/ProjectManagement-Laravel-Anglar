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

use App\Models\Label;

class LabelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function getIndex()
    {
        $labels = Label::get();
        return response()->success($labels);
    }

    /**
     * Upsert Label
     *
     * @return JSON success message
     */
    public function postLabel(Request $request)
    {
        $id = $request['id'];
        $label = null;
        if($id == null)
            $label = new Label();
        else {
            $label = Label::find($id);
        }
        $label->name = $request['name'];
        $label->color = $request['color'];
        $label->save();
        $labels = Label::get();
        return response()->success($labels);
    }

    /**
     * Delete Label
     *
     * @return JSON success message
     */
    public function deleteLabel($id)
    {
        $department = Label::find($id);
        $department->delete();
        $labels = Label::get();
        return response()->success($labels);
    }
}
