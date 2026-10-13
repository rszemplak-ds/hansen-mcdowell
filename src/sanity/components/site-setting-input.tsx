"use client";

import { useEffect, useState } from "react";
import { useClient, type StringInputProps } from "sanity";

export const siteSettingOptions = [
  { title: "Phone", value: "phone" },
  { title: "Email", value: "email" },
  { title: "Auction website", value: "auctionUrl" },
  { title: "Facebook page", value: "facebookUrl" },
  { title: "Instagram profile", value: "instagramUrl" },
] as const;

type SettingValues = Partial<Record<(typeof siteSettingOptions)[number]["value"], string>>;

const SETTINGS_QUERY = `*[_id in ["siteSettings", "drafts.siteSettings"]] | order(_updatedAt desc)[0]{
  phone, email, auctionUrl, facebookUrl, instagramUrl
}`;

/** Shows the value a site-setting link currently resolves to, so editors know where it goes. */
export function SiteSettingInput(props: StringInputProps) {
  const client = useClient({ apiVersion: "2026-08-08" });
  const [settings, setSettings] = useState<SettingValues | null>(null);

  useEffect(() => {
    let active = true;
    client
      .fetch<SettingValues | null>(SETTINGS_QUERY)
      .then((result) => {
        if (active) setSettings(result ?? {});
      })
      .catch(() => {
        if (active) setSettings({});
      });
    return () => {
      active = false;
    };
  }, [client]);

  const key = props.value as keyof SettingValues | undefined;
  const current = key && settings ? settings[key] : undefined;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {props.renderDefault(props)}
      {key ? (
        <p style={{ margin: 0, fontSize: 13, opacity: 0.75 }}>
          {settings === null
            ? "Loading current value…"
            : current
              ? `Currently: ${current}`
              : "This field is empty in Site settings, so the button will be hidden."}
        </p>
      ) : null}
    </div>
  );
}
