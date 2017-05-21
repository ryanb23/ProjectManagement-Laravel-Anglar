<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Models\Message;
use Auth;
use Bican\Roles\Models\Permission;
use Bican\Roles\Models\Role;
use Hash;
use Input;
use Validator;

class MessageController extends Controller
{
    //

    public function putCreate(Request $request)
    {
        $user = Auth::user();
        $this->validate($request, [
            'to_id' => 'required|exists:users,id|not_in:'.$user->id,
            'message' => 'required',
        ]);
        $to_id = $request['to_id'];
        $message = $request['message'];
        Message::create([
            'user_id'   => $user->id,
            'to_id'     => $to_id,
            'message'   => $message
        ]);
        return response()->success('success');
    }

    public function getAll(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $messages = Message::where('user_id',$user_id)
                  ->orwhere('to_id',$user_id)
                  ->get();
        return response()->success(compact('messages'));
    }

    public function test(){
      
    }
}
