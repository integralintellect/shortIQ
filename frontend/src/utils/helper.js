import { subDomainList } from "./constant"

export const getApps = () => {
    const subdomain = getSubDomain(window.location.hostname);

    const mainApp = subDomainList.find((app) => app.main);
    if(!mainApp) {
        return mainApp?.app || (() => null);
    }

    if(!subdomain) return mainApp.app;

    const matchedApp = subDomainList.find(
        (app) => app.subdomain === subdomain
    );

    return matchedApp?.app || mainApp.app;
};

export const getSubDomain = (hostname) => {
    if(!hostname) return "";

    const cleanHost = hostname.split(":")[0];
    const parts = cleanHost.split(".");

    if(parts.length === 1) return "";

    const isLocalhost = parts.includes("localhost");
    if(isLocalhost) {
        return parts[0];
    }

    if(parts.length > 2) {
        return parts[0];
    }

    return "";
};