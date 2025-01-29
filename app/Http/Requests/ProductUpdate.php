<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            
            "name"=> "required|string",
            
            "category_id" => "required|integer|exists:categories,id", // Validación de categoría
            "sub_category_id" => "required|integer|exists:sub_categories,id", // Validación de subcategoría
        ];
    }
}
