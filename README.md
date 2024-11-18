# API documentation

## `GET /api/events` Response:

```js
[
  {
    date: "yyyy-mm-ddT00:00:00.000Z",
    description: string,
    id: string(20),
    max_team_size: int,
    min_team_size: int,
    name: string,
    photos: [ string(20),... ],
    registration_start: "yyyy-mm-ddT00:00:00.000Z",
  },...
]
```

## `GET /api/events/string(20)`

```js
{
  date: "yyyy-mm-ddT00:00:00.000Z",
  description: string,
  id: string(20),
  max_team_size: int,
  min_team_size: int,
  name: string,
  photos: [ string(20),... ],
  registration_start: "yyyy-mm-ddT00:00:00.000Z",
}
```

## `GET /images/are/not/here/string(20)` -> image

## `GET /api/podcasts`

```js
[
  {
    description: string,
    guests: [ string,... ],
    id: string(20),
    image: string(20),
    mime: string,
    name: string,
    publish: bool,
  },...
]
```

## `GET /api/podcasts/string(20)`

```js
{
  description: string,
  guests: [ string,... ],
  id: string(20),
  image: string(20),
  mime: string,
  name: string,
  publish: bool,
}
```

## `GET /api/podcast/string(20)/stream` -> audio
