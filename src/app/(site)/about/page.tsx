import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentPlaceholder } from "@/components/content-placeholder";
import { ArrowUpRight, Check } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getAboutPage, getSiteSettings, metadataFromSeo } from "@/lib/content";
import { stockImages } from "@/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage();
  return metadataFromSeo(aboutPage?.seo, {
    title: "About",
    description:
      "Meet the family behind Hansen McDowell Estate Sales and learn about more than 30 years of experience in antiques and estate liquidation.",
  });
}

function blockText(
  block: NonNullable<NonNullable<Awaited<ReturnType<typeof getAboutPage>>>["storyBody"]>[number],
): string | null {
  if (block._type !== "block" || !block.children?.length) {
    return null;
  }

  const text = block.children.map((child) => child.text ?? "").join("");
  return text.trim() ? text : null;
}

export default async function AboutPage() {
  const [aboutPage, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);

  if (!aboutPage) {
    return (
      <section className="section">
        <div className="shell">
          <ContentPlaceholder message="About page content pending import into Sanity." />
        </div>
      </section>
    );
  }

  const values = aboutPage.values ?? [];
  const credentials = aboutPage.credentials ?? [];
  const serviceAreaCities = settings.serviceAreaCities ?? [];
  const storyParagraphs =
    aboutPage.storyBody
      ?.map(blockText)
      .filter((paragraph): paragraph is string => Boolean(paragraph)) ?? [];
  const contactFirstName = settings.contactName?.split(" ")[0] ?? "Lynn";

  return (
    <>
      <PageHero
        eyebrow={aboutPage.heroEyebrow ?? "About"}
        title={aboutPage.heroHeading ?? "About Hansen McDowell"}
        intro={
          aboutPage.heroIntroduction ??
          "About page introduction pending import into Sanity."
        }
      />

      <section className="story-feature section">
        <div className="shell story-feature__grid">
          <aside
            className="about-story-panel about-story-panel--photo"
            aria-label="Family business story"
          >
            <Image
              src={stockImages.familyRoom.src}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="about-story-panel__caption">
              <strong>{aboutPage.storyEyebrow ?? "Our family"}</strong>
              <p>Lakewood roots. Greater Cleveland work. Three generations of care.</p>
            </div>
          </aside>
          <div className="prose-block">
            {aboutPage.storyHeading ? <h2>{aboutPage.storyHeading}</h2> : null}
            {storyParagraphs.length > 0 ? (
              storyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <ContentPlaceholder message="About page story content pending import into Sanity." />
            )}
          </div>
        </div>
      </section>

      {serviceAreaCities.length > 0 ? (
        <section className="service-area-band">
          <div className="shell">
            <p className="eyebrow">Where we work</p>
            <h2>Serving families across Greater Cleveland.</h2>
            {settings.serviceArea ? <p>{settings.serviceArea}</p> : null}
            <ul>
              {serviceAreaCities.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="values section">
        <div className="shell">
          <div className="values__intro">
            {aboutPage.valuesEyebrow ? (
              <p className="eyebrow">{aboutPage.valuesEyebrow}</p>
            ) : null}
            {aboutPage.valuesHeading ? <h2>{aboutPage.valuesHeading}</h2> : null}
          </div>
          {values.length > 0 ? (
            <div className="values__grid">
              {values.map((value, index) => (
                <article key={value._key ?? value.title ?? index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {value.title ? <h3>{value.title}</h3> : null}
                  {value.body ? <p>{value.body}</p> : null}
                </article>
              ))}
            </div>
          ) : (
            <ContentPlaceholder message="About page values pending import into Sanity." />
          )}
        </div>
      </section>

      <section className="credentials section section--dark">
        <div className="shell credentials__grid">
          <div>
            {aboutPage.credentialsEyebrow ? (
              <p className="eyebrow eyebrow--light">{aboutPage.credentialsEyebrow}</p>
            ) : null}
            {aboutPage.credentialsHeading ? (
              <h2>{aboutPage.credentialsHeading}</h2>
            ) : null}
            {settings.license ? <p>{settings.license}</p> : null}
          </div>
          {credentials.length > 0 ? (
            <ul>
              {credentials.map((credential) => (
                <li key={credential._key}>
                  <Check />
                  <div>
                    {credential.title ? <strong>{credential.title}</strong> : null}
                    {credential.body ? <span>{credential.body}</span> : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ContentPlaceholder message="About page credentials pending import into Sanity." />
          )}
          <Link className="button button--pill button--cream" href="/contact">
            Talk with {contactFirstName} <ArrowUpRight />
          </Link>
        </div>
      </section>
    </>
  );
}
