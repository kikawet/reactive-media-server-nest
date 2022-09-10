-- calculate_user-video-meta

CREATE OR REPLACE FUNCTION CALCULATE_UVM(TIMEOFFSET
INTERVAL) RETURNS TABLE("userLogin" TEXT, "videoTitle"
TEXT, "score" FLOAT8, "lastTimeView" timestamp, "timesPrompted"
integer) AS
$$
	SELECT
	    w."userLogin",
	    w."videoTitle",
	    ema(
	        w."completionPercentage"
	        ORDER BY
	            w."timestamp" DESC
	    ) AS "score",
	    MAX(w."timestamp") AS "lastTimeView",
	    COUNT(w."origin") FILTER (
	        WHERE
	            w."origin" = 'System' :: "ViewOrigin"
	    )
	FROM "View" AS w
	WHERE
	    w."timestamp" >= (NOW() - timeoffset)
	GROUP BY
	    w."userLogin",
	    w."videoTitle" $$ LANGUAGE
SQL;

CREATE OR REPLACE FUNCTION CALCULATE_UVM() RETURNS
TABLE("userLogin" TEXT, "videoTitle" TEXT, "score"
FLOAT8, "lastTimeView" timestamp, "timesPrompted"
integer) AS
$$
	SELECT
	    w."userLogin",
	    w."videoTitle",
	    ema(
	        w."completionPercentage"
	        ORDER BY
	            w."timestamp" DESC
	    ) AS "score",
	    MAX(w."timestamp") AS "lastTimeView",
	    COUNT(w."origin") FILTER (
	        WHERE
	            w."origin" = 'System' :: "ViewOrigin"
	    )
	FROM "View" AS w
	GROUP BY
	    w."userLogin",
	    w."videoTitle" $$ LANGUAGE
SQL;
