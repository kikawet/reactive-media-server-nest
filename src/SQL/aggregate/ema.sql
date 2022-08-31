-- Active: 1658855706107@@127.0.0.1@5432@rmsDB
create or replace function ema_func(agg_state float8,el float8) returns float8
  language plpgsql as $$
declare
  alpha float8 := 0.125;
begin
  --  formula -> https://en.wikipedia.org/wiki/Exponential_smoothing
  return case
              when agg_state is null then el
              else alpha * el + (1 - alpha) * agg_state
         end;
end
$$;

create or replace aggregate ema(basetype = float8, sfunc = ema_func, stype = float8);
