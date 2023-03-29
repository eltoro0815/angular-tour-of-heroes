<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Heroes;

use App\Enums\Version;
use App\Http\Resources\v1_0\HeroResource;
use App\Models\Hero;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Symfony\Component\HttpFoundation\Response;

final class HeroesSearchController extends Controller
{
    public function __invoke(Request $request, Version $version, string $search): AnonymousResourceCollection
    {
        //
        abort_unless(
            $version->greaterThanOrEqualsTo(Version::v1_0),
            Response::HTTP_NOT_FOUND
        );

        $heroes = Hero::query()->where('name', 'LIKE', "%$search%")->orderBy('id')->get();

        return HeroResource::collection($heroes);
    }
}
