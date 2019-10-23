CREATE TABLE "umb_user"
(
  "userId" serial NOT NULL,
  "email" varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  "display_name" varchar(255) NOT NULL,
  CONSTRAINT "umb_user_pk" PRIMARY KEY ("userId")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "comment"
(
  "commentId" serial NOT NULL,
  "author" varchar(255) NOT NULL,
  "commentText" varchar(255) NOT NULL UNIQUE,
  "time" TIME(255) NOT NULL,
  "neg" DECIMAL NOT NULL DEFAULT '0',
  "pos" DECIMAL NOT NULL DEFAULT '0',
  "neu" DECIMAL NOT NULL DEFAULT '0',
  CONSTRAINT "comment_pk" PRIMARY KEY ("commentId")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "user_favorite"
(
  "id" serial NOT NULL,
  "userID" serial NOT NULL,
  "commentID" serial NOT NULL,
  "rating" DECIMAL NOT NULL DEFAULT '0',
  CONSTRAINT "user_favorite_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);





ALTER TABLE "user_favorite" ADD CONSTRAINT "user_favorite_fk0" FOREIGN KEY ("userID") REFERENCES "umb_user"("userId");
ALTER TABLE "user_favorite" ADD CONSTRAINT "user_favorite_fk1" FOREIGN KEY ("commentID") REFERENCES "comment"("commentId");
