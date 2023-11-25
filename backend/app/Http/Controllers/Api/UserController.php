<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserAddRequest;
use App\Http\Requests\Api\UserEditRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, UserService $userService)
    {
        $this->response->data = $userService->getAll($request->search, true);

        return $this->json();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserAddRequest $request, UserService $userService)
    {
        try {
          $userService->saveUser($request->all());
          $this->response->status = true;
          $this->response->message = "Success";
        } catch(\Throwable $th) {
          $this->code = 500;
          $this->response->status = false;
          $this->response->message = $th->getMessage();
        }
        return $this->json();
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $this->response->data = $user;

        return $this->json();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserEditRequest $request, UserService $userService, User $user)
    {
        try {
          $userService->updateUser($user, $request->all());
          $this->response->status = true;
          $this->response->message = "Success";
        } catch(\Throwable $th) {
          $this->code = 500;
          $this->response->status = false;
          $this->response->message = $th->getMessage();
        }
        return $this->json();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserService $userService, User $user)
    {
        try {
          $userService->deleteUser($user);
          $this->response->status = true;
          $this->response->message = "Success";
        } catch(\Throwable $th) {
          $this->code = 500;
          $this->response->status = false;
          $this->response->message = $th->getMessage();
        }
        return $this->json();
    }
}
