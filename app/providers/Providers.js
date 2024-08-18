"use client";

import { useRef, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/features/store";
import { syncStorageToState } from "@/lib/features/syncStorage";

export function Providers({ children }) {
  const [isReady, setIsReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      syncStorageToState(store);
      initialized.current = true;
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
}
