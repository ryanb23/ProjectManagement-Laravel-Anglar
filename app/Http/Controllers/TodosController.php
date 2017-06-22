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

use App\Models\TodoList;
use App\Http\Traits\CustomTrait;

class TodosController extends Controller
{
    use CustomTrait;

    public function getIndex()
    {
        $todoList = Todolist::all();
        return response()->success($todoList);
    }

    public function postStore(Request $request)
    {
        
    }
}
