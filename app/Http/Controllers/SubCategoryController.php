<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubCategoryStore;
use App\Http\Requests\SubCategoryUpdate;
use App\Http\Resources\SubCategoryResource;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SubCategoryResource::collection(SubCategory::with("products")->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => "required",
            "link" => "required",
            "order_value" => "required",
            "category_id" => "required|exists:categories,id",
        ]);
        $subCategory = SubCategory::create($data);
        return new SubCategoryResource($subCategory);
    }

    /**
     * Display the specified resource.
     */
    public function show(SubCategory $subCategory)
    {
        $subCategory->load("products");
        return new SubCategoryResource($subCategory);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $subCategory = SubCategory::findOrFail($id);

        $data = $request->validate([
            "name" => "required",
            "link" => "required",
            "order_value" => "required",
            "category_id" => "required|exists:categories,id",
        ]);
        $subCategory->update($data);
        return response()->json($subCategory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubCategory $subCategory)
    {
        $subCategory->delete();
        return response('', 204);
    }
}
