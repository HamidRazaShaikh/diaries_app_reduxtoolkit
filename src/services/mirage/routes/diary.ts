import { Request, Response } from "miragejs";
import { Diary } from "../../../interfaces/interfaces";
import { User } from "../../../interfaces/interfaces";
import { handleError } from "./../server";
import dayjs from "dayjs";

export const create = (
  schema: any,
  req: Request
): { diary: Diary; user: User } | Response => {
  try {
    const { title, type, userId } = JSON.parse(req.requestBody);
    const exUser = schema.users.findBy({ id: userId });
    if (!exUser) {
      handleError(null, "no such user exist");
    }
    const now = dayjs().format();
    const diary = exUser.createDiary({
      title,
      type,
      createdAt: now,
      updatedAt: now,
    });

    return {
      user: {
        ...exUser.attrs,
      },

      diary: diary.attrs,
    };
  } catch (error) {
    return handleError(error, "Failed to create Diary.");
  }
};

export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
  try {
    const user = schema.users.findBy(req.params.id);
    return user.diary as Diary[];
  } catch (error) {
    return handleError(error, "Could not get user diaries.");
  }
};
