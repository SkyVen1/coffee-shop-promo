<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'message' => 'required|string',
            'honeypot' => 'nullable|max:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Помилка валідації',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::table('reviews')->insert([
                'name' => $request->name,
                'email' => $request->email,
                'message' => $request->message,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Відгук збережено успішно',
                'name' => htmlspecialchars($request->name)
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Помилка сервера'
            ], 500);
        }
    }
}