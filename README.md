# Frontend
```
ng serve
```


# Backend

## How to use ?

### Seed Database
```
ddev artisan migrate --seed
```

### Postman Howto

1. In Postman make POST Request with:Headers:
```
Accept: application/json
Content-Type: application/json
```

3. URL: https://hero-backend.ddev.site/api/auth/token

4. Body: raw -> JSON
    3.1
```
    {
        "email" : "thorsten@ddev.site",
        "password" : "thorsten@ddev.site",
        "token_name" : "hbtoken"
    }
```

5. you get an API token
e.g.
```
{
    "token": "4|huHEUg0yTbIOshyBFARtGy0qQ5iytGSlKmYXTgCZ"
}
```

6. Use this token as Bearer Token

7. In your Postman Collection you can go to tab _Authorization_ and set
```
Type        Bearer Token

Token       4|huHEUg0yTbIOshyBFARtGy0qQ5iytGSlKmYXTgCZ
```
