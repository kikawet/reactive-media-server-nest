-- Active: 1658855706107@@127.0.0.1@5432@rmsDB
CREATE OR REPLACE VIEW "UserVideoMeta" AS

SELECT * FROM calculate_uvm()
