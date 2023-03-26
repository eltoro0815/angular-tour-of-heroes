<?php

declare(strict_types=1);

namespace App\Http\Resources\v1_0;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class HeroResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'uuid'       => $this->uuid,
            'id'         => $this->id,
            'name'       => $this->name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
