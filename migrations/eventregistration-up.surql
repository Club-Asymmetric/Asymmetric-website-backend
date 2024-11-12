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
DEFINE FIELD event ON registration TYPE record<event>;

// Test Data
CREATE event CONTENT {
    name: "tales_of_threats",
    participants: 100,
    date: time::now(),
};
CREATE event CONTENT {
    name: "horror_codes",
    participants: 150,
    date: time::now() + 2w,
};
CREATE event CONTENT {
    name: "noice_workshop",
    participants: 10,
    date: time::now() + 1w,
};