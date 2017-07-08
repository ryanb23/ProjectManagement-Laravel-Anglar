<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Config;

use Auth;
use Bican\Roles\Models\Permission;
use Bican\Roles\Models\Role;
use Hash;
use Input;
use Validator;

use App\User;
use App\Models\Message;
use App\Events\MessagePostEvent;

class MessageController extends Controller
{

    public function postCreate(Request $request)
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

        event(new MessagePostEvent($message, $to_id));
        return response()->success('success');
    }

    public function getMessageWith(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $to_id = $request['with_id'];
        $messages = Message::with('user')
            ->whereIn('user_id', [$user_id,$to_id])
            ->whereIn('to_id', [$user_id,$to_id])
            ->get();

        Message::with('user')
            ->whereIn('user_id', [$user_id,$to_id])
            ->whereIn('to_id', [$user_id,$to_id])
            ->update(['is_read' => 1]);
        return response()->success($messages);
    }
}
