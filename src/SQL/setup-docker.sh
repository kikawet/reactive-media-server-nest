#!/usr/bin/bash

set -xe

DBPWD=${DBPWD:-rmsPassword}
DBUSR=${DBUSR:-rmsUser}
DBNAME=${DBNAME:-rmsDB}
DBPORT=${DBPORT:-5432}

docker run -p $DBPORT:$DBPORT --name rms-db -e POSTGRES_DB=$DBNAME -e POSTGRES_PASSWORD=$DBPWD -e POSTGRES_USER=$DBUSR -d postgres

echo "Database created connect to the console and run:"
echo "psql $DBNAME $DBUSR"
