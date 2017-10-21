<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use Auth;
use Hash;
use Input;
use Validator;
use \Config;
use DB;

use App\Models\Reward;

class RewardController extends Controller
{
    private function getAll(){
        $rewards = Reward::orderby('id','asc')->get();
        return $rewards;
    }

    public function getIndex(Request $request)
    {
        $rewards = self::getAll();
        return response()->success($rewards);
    }

    public function postReward(Request $request)
    {
        $id = $request['id'];
        $point = $request['point'];
        Reward::where('id',$id)->update(['point' => $point]);
        $rewards = self::getAll();
        return response()->success($rewards);
    }
}
