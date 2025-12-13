import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./loader.json";

export default function Loading() {
  const container = useRef(null);

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData
    });

    return () => instance.destroy();
  }, []);

  return <div ref={container} style={{ width: 200, height: 200 }} />;
}
