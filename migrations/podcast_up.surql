DEFINE TABLE podcast SCHEMAFULL;
DEFINE FIELD publish ON podcast TYPE datetime;
DEFINE FIELD guest ON podcast TYPE array<string>;
DEFINE FIELD description ON podcast TYPE string;
DEFINE FIELD photo ON podcast TYPE bytes;
DEFINE FIELD image ON podcast TYPE bytes;