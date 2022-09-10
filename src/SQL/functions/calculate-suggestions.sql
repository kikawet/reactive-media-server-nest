CREATE or replace FUNCTION calculate_suggestions(u "User")
RETURNS void AS $$
DECLARE
	userVideoMetaCursor CURSOR FOR SELECT * FROM "UserVideoMeta" WHERE "userLogin" = u.login;
	rows_results bigint;
	min_views integer;
	rand float8;
	shrunk_score float8;
BEGIN

DELETE FROM "SuggestionBase" AS s WHERE s."userLogin" = u.login;
-- GET DIAGNOSTICS rows_results = ROW_COUNT;
-- RAISE NOTICE 'Deleted % rows',rows_results;

SELECT MIN("timesPrompted") INTO min_views FROM "UserVideoMeta" WHERE "userLogin" = u.login;
-- RAISE NOTICE 'Min views is % times',min_views;

-- rand = random();
-- RAISE NOTICE 'Random value %',rand;

FOR uvmr IN userVideoMetaCursor LOOP
	rand = random();
	shrunk_score = (uvmr."score" - uvmr."timesPrompted" + min_views)/100;

	IF rand < shrunk_score THEN
		INSERT INTO "SuggestionBase" VALUES (uvmr."userLogin",uvmr."videoTitle", uvmr."score"/100);
	ELSE
		INSERT INTO "SuggestionBase" VALUES (uvmr."userLogin",uvmr."videoTitle", uvmr."score"/100-1);
	END IF;

-- 	GET DIAGNOSTICS rows_results = ROW_COUNT;
-- 	RAISE NOTICE 'inserted % row',rows_results;

END LOOP;

END
$$ LANGUAGE plpgsql;
