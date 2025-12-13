import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./Welcome.json";

export default function Welcome({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    return () => animation.destroy();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
    />
  );
}
