"use client";

import { useEffect, useState } from "react";

/**
 * Loads third-party scripts only after the user interacts with the page
 * (scroll, click, touch). This avoids impacting FCP/LCP/TBT scores.
 */
export default function DeferredScripts() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let done = false;
    const activate = () => {
      if (done) return;
      done = true;
      setActive(true);
    };

    const events: string[] = ["scroll", "click", "touchstart", "mousemove", "keydown"];
    events.forEach((e) =>
      window.addEventListener(e, activate, { once: true, passive: true })
    );

    return () => {
      done = true;
      events.forEach((e) => window.removeEventListener(e, activate));
    };
  }, []);

  if (!active) return null;

  return (
    <>
      {/* Chat widget */}
      <script
        src="https://beta.leadconnectorhq.com/loader.js"
        data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="69d820a0d69ee846629b99ba"
        async
      />
      {/* Reviews widget */}
      <script
        src="https://reputationhub.site/reputation/assets/review-widget.js"
        async
      />
    </>
  );
}
