<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\InteractsWithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class Hero extends Model
{
    use HasFactory;
    use InteractsWithUuid;
}
