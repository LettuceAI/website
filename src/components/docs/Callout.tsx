import { Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "success";

interface CalloutProps {
    type?: CalloutType;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

const config = {
    info: {
        icon: Info,
        class: "callout-info",
        iconClass: "text-blue-400",
    },
    warning: {
        icon: AlertTriangle,
        class: "callout-warning",
        iconClass: "text-amber-400",
    },
    success: {
        icon: CheckCircle2,
        class: "callout-success",
        iconClass: "text-primary",
    },
};

export function Callout({ type = "info", title, children, className }: CalloutProps) {
    const { icon: Icon, class: typeClass, iconClass } = config[type];

    return (
        <div className={cn("callout flex gap-4 pr-6", typeClass, className)}>
            <div className="mt-1">
                <Icon className={cn("w-5 h-5", iconClass)} />
            </div>
            <div className="space-y-1 min-w-0">
                {title && (
                    <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                        {title}
                    </div>
                )}
                <div className="text-[14px] text-muted-foreground leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
