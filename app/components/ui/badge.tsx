import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * @typedef {Object} BadgeComponentProps
 * @property {string} [className] - Optional CSS class names.
 * @property {'default' | 'secondary' | 'destructive' | 'outline'} [variant='default'] - The visual style of the badge.
 * @extends {React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>}
 */
/**
 * A small, typically rounded, UI element that displays a short, important piece of information.
 * It is often used to highlight a status, count, or category.
 * @param {BadgeComponentProps} props
 * @returns {JSX.Element}
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }


