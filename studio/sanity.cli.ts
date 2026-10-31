import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "ntvvkd3p", dataset: "production" },
  // Hosted dashboard address → https://shivayoganiketan.sanity.studio
  studioHost: "shivayoganiketan",
  deployment: { autoUpdates: true },
});
