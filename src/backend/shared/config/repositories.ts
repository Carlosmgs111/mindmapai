import { Level } from "level";

let textsDB: Level;

export function getTextsDB() {
  if (!textsDB) {
    textsDB = new Level("./database/level/texts", { valueEncoding: "json" });
  }
  return textsDB;
}

let promptsDB: Level;

export function getPromptsDB() {
  if (!promptsDB) {
    promptsDB = new Level("./database/level/prompts", { valueEncoding: "json" });
  }
  return promptsDB;
}
