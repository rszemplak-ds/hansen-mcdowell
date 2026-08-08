import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main style={{ fontFamily: "system-ui", maxWidth: 720, margin: "10vh auto", padding: 24 }}>
        <h1>Sanity Studio is ready to connect</h1>
        <p>Add NEXT_PUBLIC_SANITY_PROJECT_ID to the environment, then redeploy.</p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
