import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there's a hash, we let the internal doc hash scroll logic handle it
        if (!hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}
