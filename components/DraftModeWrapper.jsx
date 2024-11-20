"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";

export function DraftModeWrapper({ subscription, LayoutComponent }) {
  const { data } = useQuerySubscription(subscription);

  return <LayoutComponent data={data} />;
}
