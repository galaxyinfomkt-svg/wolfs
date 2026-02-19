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

    // Fallback: load after 8 seconds regardless
    const timer = setTimeout(activate, 8000);

    return () => {
      done = true;
      events.forEach((e) => window.removeEventListener(e, activate));
      clearTimeout(timer);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      {/* Chat widget */}
      <script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="66999080b120684ccf0d5c5f"
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
