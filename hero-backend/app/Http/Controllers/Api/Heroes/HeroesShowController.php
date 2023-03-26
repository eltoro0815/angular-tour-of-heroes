<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Heroes;

use App\Enums\Version;
use App\Http\Resources\v1_0\HeroResource;
use App\Models\Hero;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Routing\Controller;
use Symfony\Component\HttpFoundation\Response;

final class HeroesShowController extends Controller
{
    public function __invoke(Request $request, Version $version, Hero $hero): JsonResource
    {
        abort_unless(
            $version->greaterThanOrEqualsTo(Version::v1_0),
            Response::HTTP_NOT_FOUND
        );

        return HeroResource::make($hero);
    }
}
