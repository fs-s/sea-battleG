<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $message = ' ';
        $name = 'Arno';
        if ($request ->has('message')) {
            $message = $request ->message;
        }
        return view('home', compact('name', 'message') );
    }
}
