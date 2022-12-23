SELECT
    "id_com",
    "content",
    "id_post",
    "id_user",
    "reply",
    "created_at" AS "createdAt",
    "updated_at" AS "updatedAt"
FROM
    "Comment" AS "Comment"
WHERE
    "Comment"."id_com" = '3'