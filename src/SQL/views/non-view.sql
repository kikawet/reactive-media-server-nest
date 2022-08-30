-- Active: 1658855706107@@127.0.0.1@5432@rmsDB

CREATE OR REPLACE VIEW "NonView" AS

SELECT u.login, v.title FROM "User" as u, "Video" as v
EXCEPT
SELECT DISTINCT "userLogin", "videoTitle" from "View"
