import { useEffect, useState } from "react";

/**
 * Presentational-only sidebar collapse state, persisted in localStorage so the
 * choice is consistent across the dashboard and CMS shells. No business logic.
 */
const STORAGE_KEY = "adminSidebarCollapsed";

const useSidebarCollapse = () => {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(collapsed));
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
  }, [collapsed]);

  const toggleCollapsed = () => setCollapsed((value) => !value);

  return { collapsed, toggleCollapsed };
};

export default useSidebarCollapse;
