DEFINE TABLE photo SCHEMAFULL;
DEFINE FIELD binary ON photo TYPE bytes;
DEFINE FIELD mime ON photo TYPE string ASSERT $value INSIDE [
	'apng',
	'avif',
	'gif',
	'jpeg',
	'png',
	'svg+xml',
	'webp'
];

DEFINE TABLE event SCHEMAFULL;
DEFINE FIELD name ON event TYPE string;
DEFINE FIELD participants ON event TYPE int;
DEFINE FIELD date ON event TYPE datetime VALUE $value.group('day');
DEFINE FIELD registration_dates ON event TYPE array<datetime, 2>
    VALUE $value[*].group('day')
    ASSERT $value.len() == 2;
DEFINE FIELD team_size ON event TYPE array<int, 2>
    ASSERT $value.len() == 2 AND $value[*] > 0;
DEFINE FIELD photos ON event TYPE array<record<photo>>;
DEFINE FIELD description ON event TYPE string;

DEFINE TABLE registration TYPE NORMAL SCHEMAFULL;
DEFINE FIELD name ON registration TYPE string;
DEFINE FIELD team ON registration TYPE option<string>;
DEFINE FIELD members ON registration TYPE array<string>
    ASSERT $value.len() >= $this.event.team_size[0] AND $value.len() <= $this.event.team_size[1];
DEFINE FIELD year ON registration TYPE datetime VALUE $value.group('year');
DEFINE FIELD department ON registration TYPE string;
DEFINE FIELD college ON registration TYPE string;
DEFINE FIELD email ON registration TYPE string ASSERT $value.is_email();
DEFINE FIELD number ON registration TYPE number;
DEFINE FIELD event ON registration TYPE record<event>;
DEFINE INDEX emails ON registration FIELDS email UNIQUE;
DEFINE INDEX numbers ON registration FIELDS number UNIQUE;

DEFINE TABLE podcast TYPE NORMAL SCHEMAFULL;
DEFINE FIELD name ON podcast TYPE string;
DEFINE FIELD publish ON podcast TYPE datetime VALUE $value.group('day');
DEFINE FIELD guests ON podcast TYPE array<string> ASSERT $value.len() > 0;
DEFINE FIELD description ON podcast TYPE string;
DEFINE FIELD image ON podcast TYPE record<photo>;
DEFINE FIELD mime ON podcast TYPE string ASSERT $value INSIDE [
	'aac',
	'midi',
	'mpeg',
	'ogg',
	'opus',
	'wav',
	'webm'
];

DEFINE TABLE member TYPE NORMAL SCHEMAFULL;
DEFINE FIELD role ON member TYPE string;
DEFINE FIELD name ON member TYPE string;
DEFINE FIELD photos ON member TYPE array<record<photo>>;
DEFINE FIELD `info` ON member TYPE string;
DEFINE FIELD portfolio ON member TYPE string;