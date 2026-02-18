"use client";

import { useState, useEffect, useRef } from "react";

export default function LazyIframe(
  props: React.IframeHTMLAttributes<HTMLIFrameElement> & { src: string }
) {
  const { src, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let activated = false;
    const activate = () => {
      if (activated) return;
      activated = true;
      setLoaded(true);
    };

    const events = ["scroll", "click", "touchstart", "mousemove", "keydown"];
    events.forEach((e) =>
      window.addEventListener(e, activate, { once: true, passive: true })
    );

    const timer = setTimeout(activate, 5000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, activate));
      clearTimeout(timer);
    };
  }, []);

  return <iframe ref={iframeRef} {...rest} src={loaded ? src : undefined} />;
}
