CREATE OR REPLACE FUNCTION after_insert_view_update_suggestion_tigger_function() RETURNS TRIGGER AS $$
DECLARE
	min_views integer;
	rand float8;
	shrunk_score float8;
	uvmr "UserVideoMeta"%ROWTYPE;
BEGIN
	DELETE FROM "SuggestionBase" AS s WHERE s."userLogin" = NEW."userLogin" and s."videoTitle" = NEW."videoTitle";
	SELECT MIN("timesPrompted") INTO min_views FROM "UserVideoMeta" WHERE "userLogin" = NEW."userLogin";
	SELECT * INTO uvmr FROM "UserVideoMeta" AS uvm WHERE uvm."userLogin" = NEW."userLogin" and uvm."videoTitle" = NEW."videoTitle";

	rand = random();
	shrunk_score = (uvmr."score" - uvmr."timesPrompted" + min_views)/100;

	IF rand < shrunk_score THEN
		INSERT INTO "SuggestionBase" VALUES (NEW."userLogin",NEW."videoTitle", uvmr."score"/100);
	ELSE
		INSERT INTO "SuggestionBase" VALUES (NEW."userLogin",NEW."videoTitle", uvmr."score"/100-1);
	END IF;

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER after_insert_view_update_suggestion_tigger
AFTER INSERT ON "View" FOR EACH ROW EXECUTE FUNCTION after_insert_view_update_suggestion_tigger_function();
