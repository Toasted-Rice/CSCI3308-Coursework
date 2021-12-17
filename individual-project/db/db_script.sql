DROP TABLE IF EXISTS brew_reviews CASCADE;
CREATE TABLE IF NOT EXISTS brew_reviews (
	id 				VARCHAR(255) 	NOT NULL,
	brewery_name 	VARCHAR(255) 	NOT NULL,
	brewery_website VARCHAR(255) 	NOT NULL,
	brewery_city 	VARCHAR(255) 	NOT NULL,
	brewery_state 	VARCHAR(2) 		NOT NULL,
	review 			VARCHAR(65535)	NOT NULL,
	review_date 	TIMESTAMPTZ 	NOT NULL,
	rating 			NUMERIC(1,0) 	NOT NULL,
	CHECK (rating < 6 AND rating > 0),
	PRIMARY KEY (id, review_date)
);

SET TIMEZONE = 'America/Denver';