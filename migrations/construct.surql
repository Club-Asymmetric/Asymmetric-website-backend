DEFINE TABLE photo SCHEMAFULL;
DEFINE FIELD binary ON photo TYPE bytes;
DEFINE FIELD mime ON photo TYPE string
 ASSERT $value IN ["apng", "avif", "gif", "jpeg", "png", "svg+xml", "webp"];

DEFINE TABLE event SCHEMAFULL;
DEFINE FIELD name ON event TYPE string;
DEFINE FIELD participants ON event TYPE int;
DEFINE FIELD date ON event TYPE datetime VALUE time::group($value, "day");
DEFINE FIELD photos ON event TYPE array<record<photo>>;
DEFINE FIELD description ON event TYPE string;

DEFINE TABLE registration SCHEMAFULL;
DEFINE FIELD name ON registration TYPE string;
DEFINE FIELD team ON registration TYPE string;
DEFINE FIELD members ON registration TYPE array<string, 3>;
DEFINE FIELD year ON registration TYPE datetime VALUE time::group($value, "year");
DEFINE FIELD event_date ON registration TYPE datetime VALUE time::group($value, "day");
DEFINE FIELD department ON registration TYPE string;
DEFINE FIELD college ON registration TYPE string;
DEFINE FIELD mail ON registration TYPE string ASSERT string::is::email($value);
DEFINE FIELD number ON registration TYPE number;
DEFINE FIELD event ON registration TYPE record<event>;
DEFINE INDEX emails ON registration FIELDS mail UNIQUE;
DEFINE INDEX numbers ON registration FIELDS number UNIQUE;

DEFINE TABLE podcast SCHEMAFULL;
DEFINE FIELD publish ON podcast TYPE datetime;
DEFINE FIELD guests ON podcast TYPE array<string>;
DEFINE FIELD description ON podcast TYPE string;
DEFINE FIELD audio ON podcast TYPE bytes;
DEFINE FIELD image ON podcast TYPE record<photo>;

DEFINE TABLE member SCHEMAFULL;
DEFINE FIELD role ON member TYPE string;
DEFINE FIELD name ON member TYPE string;
DEFINE FIELD photos ON member TYPE array<record<photo>>;
DEFINE FIELD portfolio ON member TYPE string;