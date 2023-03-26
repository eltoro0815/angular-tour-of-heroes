<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Heroes;

use App\Enums\Version;
use App\Models\Hero;
use Illuminate\Http\{Request, JsonResponse};
use Illuminate\Routing\Controller;
use Symfony\Component\HttpFoundation\Response;

final class HeroesDestroyController extends Controller
{
    public function __invoke(Request $request, Version $version, Hero $hero): JsonResponse
    {
        abort_unless(
            $version->greaterThanOrEqualsTo(Version::v1_0),
            Response::HTTP_NOT_FOUND
        );

        $hero->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
