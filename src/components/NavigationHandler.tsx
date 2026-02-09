import { useDashboardNavigate } from "@sanity/sdk-react";
import { useNavigate } from "react-router";

/**
 * Bridges Sanity Dashboard navigation events to React Router.
 * When the app is deployed to the Sanity Dashboard, the dashboard
 * can trigger navigation (e.g., deep links). This component
 * listens for those events and forwards them to React Router.
 *
 * Renders nothing — it's a pure side-effect component.
 */
export function NavigationHandler() {
  const navigate = useNavigate();

  useDashboardNavigate((event) => {
    navigate(event.path, { replace: event.type === "replace" });
  });

  return null;
}
