<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Heroes;

use App\Enums\Version;
use App\Http\Requests\Api\v1_0\HeroUpdateRequest;
use App\Http\Resources\v1_0\HeroResource;
use App\Models\Hero;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Routing\Controller;
use Symfony\Component\HttpFoundation\Response;

final class HeroesUpdateController extends Controller
{
    public function __invoke(HeroUpdateRequest $request, Version $version, Hero $hero): JsonResource
    {
        abort_unless(
            $version->greaterThanOrEqualsTo(Version::v1_0),
            Response::HTTP_NOT_FOUND
        );

        $hero->update($request->validated());

        return HeroResource::make($hero->refresh());
    }
}
