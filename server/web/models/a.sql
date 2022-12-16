SELECT
    "User"."id_user",
    "User"."name",
    "User"."email",
    "User"."password",
    "User"."gender",
    "User"."content",
    "User"."role",
    "User"."dob",
    "User"."image",
    "User"."created_at" AS "createdAt",
    "User"."updated_at" AS "updatedAt",
    "Posts"."id_post" AS "Posts.id_post",
    "Posts"."content" AS "Posts.content",
    "Posts"."id_user" AS "Posts.id_user",
    "Posts"."created_at" AS "Posts.createdAt",
    "Posts"."updated_at" AS "Posts.updatedAt",
    "Posts->Like_Post"."id_lp" AS "Posts.Like_Post.id_lp",
    "Posts->Like_Post"."id_user" AS "Posts.Like_Post.id_user",
    "Posts->Like_Post"."id_post" AS "Posts.Like_Post.id_post",
    "Posts->Like_Post"."user_id_user" AS "Posts.Like_Post.UserIdUser"
FROM
    "User" AS "User"
    LEFT OUTER JOIN (
        "Like_Post" AS "Posts->Like_Post"
        INNER JOIN "Post" AS "Posts" ON "Posts"."id_post" = "Posts->Like_Post"."id_post"
    ) ON "User"."id_user" = "Posts->Like_Post"."id_user"
WHERE
    "User"."id_user" = '1';