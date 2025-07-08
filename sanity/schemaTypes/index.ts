import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { startup } from "./startUp";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup],
};
