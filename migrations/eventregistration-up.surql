DEFINE TABLE event SCHEMAFULL;
DEFINE FIELD name ON event TYPE string;
DEFINE FIELD participants ON event TYPE int;
DEFINE FIELD date ON event TYPE datetime VALUE time::group($value, "day");

DEFINE TABLE registration SCHEMAFULL;
DEFINE FIELD name ON registration TYPE string;
DEFINE FIELD team ON registration TYPE string;
DEFINE FIELD members ON registration TYPE array<string, 3>;
DEFINE FIELD year ON registration TYPE datetime VALUE time::group($value, "year");
DEFINE FIELD event_date ON registration TYPE datetime VALUE time::group($value, "day");
DEFINE FIELD department ON registration TYPE string;
DEFINE FIELD college ON registration TYPE string;
DEFINE FIELD mail ON registration TYPE string ASSERT string::is::email($value);
