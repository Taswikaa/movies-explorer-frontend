import { useEffect, useRef } from "react";

export default function useEffectAfterMount(cb, dependencies) {
  const mounted = useRef(true);

  useEffect(() => {
    if (!mounted.current) {
      return cb();
    }
    mounted.current = false;
  }, dependencies);
};