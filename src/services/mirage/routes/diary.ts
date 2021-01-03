import { Request, Response } from "miragejs";
import { Diary, Entry } from "../../../interfaces/interfaces";
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
    const user = schema.users.findBy({ id: req.params.id });
    return user.diary as Diary[];
  } catch (error) {
    return handleError(error, "Could not get user diaries.");
  }
};

export const updateDiary = (schema: any, req: Request): Diary | Response => {
  try {
    const diary = schema.diaries.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<Diary>;
    const now = dayjs().format();

    diary.update({
      ...data,
      updatedAt: now,
    });

    return diary.attrs as Diary;
  } catch (error) {
    return handleError(error, "Failed to update Diary.");
  }
};

export const addEntry = (
  schema: any,
  req: Request
): { diary: Diary; entry: Entry } | Response => {
  try {
    const diary = schema.diaries.find(req.params.id);
    const { title, content } = JSON.parse(req.requestBody);

    const now = dayjs().format();

    const entry = diary.createEntry({
      title,
      content,
      createdAt: now,
      updatedAt: now,
    });

    diary.update({
      ...diary.attrs,
      updatedAt: now,
    });

    return {
      diary: diary.attrs,
      entry: entry.attrs,
    };
  } catch (error) {
    return handleError(error, "Failed to save entry.");
  }
};

export const getEntries = (
  schema: any,
  req: Request
): any | Response => {
  try {
    const diary = schema.diaries.find(req.params.id);
    return diary.entry;
  } catch (error) {
    handleError(error, "Failed to get Diary entries.");
  }
};

export const updateEntry = (schema: any, req: Request): any | Response => {
  try {
    const entry = schema.entries.find(req.params.id);
    const data = JSON.parse(req.requestBody);
    const now = dayjs().format();

    entry.update({
      ...data,
      updatedAt: now,
    });

    return entry.attrs as Entry;
  } catch (error) {
    handleError(error, "Failed to update entry.");
  }
};
