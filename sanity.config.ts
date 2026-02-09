import { defineConfig } from "sanity";
import {
  article,
  category,
  codeBlock,
  callout,
  dataTable,
  embed,
} from "./schemas";

export default defineConfig({
  name: "sanity-kb",
  title: "Knowledge Base",

  // TODO: Replace with real project ID and dataset from @adamgray
  projectId: "PLACEHOLDER",
  dataset: "production",

  schema: {
    types: [
      // Document types
      article,
      category,
      // Custom Portable Text block types
      codeBlock,
      callout,
      dataTable,
      embed,
    ],
  },
});
