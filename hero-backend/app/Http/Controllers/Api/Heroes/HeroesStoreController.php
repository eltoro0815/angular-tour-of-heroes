<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Heroes;

use App\Enums\Version;
use App\Http\Requests\Api\v1_0\HeroStoreRequest;
use App\Http\Resources\v1_0\HeroResource;
use App\Models\Hero;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Routing\Controller;
use Symfony\Component\HttpFoundation\Response;

final class HeroesStoreController extends Controller
{
    public function __invoke(HeroStoreRequest $request, Version $version): JsonResource
    {
        abort_unless(
            $version->greaterThanOrEqualsTo(Version::v1_0),
            Response::HTTP_NOT_FOUND
        );

        $hero = Hero::create($request->validated());

        return HeroResource::make($hero);
    }
}
