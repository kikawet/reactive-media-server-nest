CREATE or replace FUNCTION calculate_uvm(timeoffset interval default '5 hours')
RETURNS Table(
  "userLogin" text,
  "videoTitle" text,
  "score" float8,
  "lastTimeView" timestamp,
  "origin" float8
) AS $$
select w."userLogin",
 w."videoTitle",
 ema(w."completionPercentage" ORDER BY w."timestamp" DESC) as "score",
 max(w."timestamp") as "lastTimeView",
 COUNT(w."origin") filter (where w."origin" = 'System'::"ViewOrigin")
 from "View" as w
WHERE w."timestamp" >= (now() - timeoffset)
GROUP BY w."userLogin", w."videoTitle"
$$ LANGUAGE sql;
