# API documentation

## `GET /api/events` Response:

```js
[
  {
    date: "yyyy-mm-ddT00:00:00.000Z",
    description: string,
    id: string(20),
    name: string,
    photos: [ string(20)... ],
    registration_dates: [
      "yyyy-mm-ddT00:00:00.000Z",
      "yyyy-mm-ddT00:00:00.000Z",
    ],
    team_size: [
      int,
      int,
    ],
  },...
]
```

## `GET /api/events/string(20)`

```js
{
  date: "yyyy-mm-ddT00:00:00.000Z",
  description: string,
  id: string(20),
  name: string,
  photos: [ string(20)... ],
  registration_dates: [
    "yyyy-mm-ddT00:00:00.000Z",
    "yyyy-mm-ddT00:00:00.000Z",
  ],
  team_size: [
    int,
    int,
  ],
}
```

## `GET /images/are/not/here/string(20)` -> image

## `GET /api/podcasts`

```js
[
  {
    description: string,
    guests: [ string... ],
    id: string(20),
    image: string(20),
    name: string,
    publish: "yyyy-mm-ddT00:00:00.000Z",
  },...
]
```

## `GET /api/podcasts/string(20)`

```js
{
  description: string,
  guests: [ string... ],
  id: string(20),
  image: string(20),
  name: string,
  publish: "yyyy-mm-ddT00:00:00.000Z",
}
```

## `GET /api/podcast/string(20)/stream` -> audio
