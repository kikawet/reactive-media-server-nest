-- Cloned from Suggestion auto generated SQL

CREATE TABLE IF NOT EXISTS "SuggestionBase"
(
    "userLogin" text COLLATE pg_catalog."default" NOT NULL,
    "videoTitle" text COLLATE pg_catalog."default" NOT NULL,
    priority double precision NOT NULL,
    CONSTRAINT "SuggestionBase_pkey" PRIMARY KEY ("userLogin", "videoTitle"),
    CONSTRAINT "SuggestionBase_userLogin_fkey" FOREIGN KEY ("userLogin")
        REFERENCES public."User" (login) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT "SuggestionBase_videoTitle_fkey" FOREIGN KEY ("videoTitle")
        REFERENCES public."Video" (title) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)
