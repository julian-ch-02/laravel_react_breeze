<?php

if (!function_exists('datatable')) {
    /**
     * @param  \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model  $query
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    function datatable($query): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        $request = request();
        $perPage = $request->per_page ?? 10;
        return $query->paginate(
            $perPage
        )->onEachSide(1)->withQueryString();
    }
}
