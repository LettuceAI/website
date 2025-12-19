import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface SnowContextType {
    snowEnabled: boolean;
    toggleSnow: () => void;
    isHolidaySeason: boolean;
}

const SnowContext = createContext<SnowContextType | null>(null);

function checkHolidaySeason(): boolean {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();

    // December 15 - December 31
    if (month === 11 && day >= 15) return true;
    // January 1 - January 20
    if (month === 0 && day <= 20) return true;

    return false;
}

export function SnowProvider({ children }: { children: ReactNode }) {
    const isHolidaySeason = checkHolidaySeason();

    const [snowEnabled, setSnowEnabled] = useState(() => {
        if (!isHolidaySeason) return false;
        const saved = localStorage.getItem("snowEnabled");
        return saved !== null ? saved === "true" : true; 
    });

    useEffect(() => {
        if (isHolidaySeason) {
            localStorage.setItem("snowEnabled", String(snowEnabled));
        }
    }, [snowEnabled, isHolidaySeason]);

    const toggleSnow = () => setSnowEnabled((prev) => !prev);

    return (
        <SnowContext.Provider value={{ snowEnabled, toggleSnow, isHolidaySeason }}>
            {children}
        </SnowContext.Provider>
    );
}

export function useSnow() {
    const context = useContext(SnowContext);
    if (!context) {
        throw new Error("useSnow must be used within a SnowProvider");
    }
    return context;
}
