import type { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "../../lib/utils";

export function Card({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn("glass-panel rounded-[28px] border border-line/80 p-5 shadow-glow sm:p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

