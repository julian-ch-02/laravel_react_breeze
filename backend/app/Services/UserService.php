<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    /**
     * @param $search
     * @param  bool  $trashed
     * @param  bool  $paginate
     * @return LengthAwarePaginator|Builder[]|Collection
     */
    public function getAll(
        $search,
        bool $paginate = false,
    ): Collection|LengthAwarePaginator|array {
        $query = User::where('email', 'LIKE', "%$search%")
            ->orderBy('email');

        if ($paginate) {
            return datatable($query);
        }

        return $query->get();
    }

    /**
     * @param  array  $data
     * @return User
     */
    public function saveUser(array $data): User
    {
        $user = new User($data);
        $user->password = bcrypt($user->password);
        $user->save();

        return $user;
    }

    /**
     * @param  User  $user
     * @param  array  $data
     * @return User
     * @throws Exception
     */
    public function updateUser(User $user, array $data): User
    {
        $user->update($data);

        return $user;
    }


    /**
     * @param  User  $user
     * @return User
     */
    public function deleteUser(User $user): User
    {
        $user->delete();

        return $user;
    }
}
