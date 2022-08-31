-- Active: 1658855706107@@127.0.0.1@5432@rmsDB
CREATE OR REPLACE VIEW "UserVideoMeta" AS

SELECT w."userLogin", w."videoTitle",
        ema(w."completionPercentage" ORDER BY w."timestamp" DESC) AS "score",
        max(w."timestamp") as "lastTimeView"
FROM "View" AS w
GROUP BY w."userLogin", w."videoTitle"
