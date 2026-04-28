import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * @typedef {Object} CardProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 */
/**
 * A flexible content container that groups related information.
 * @param {CardProps} props
 * @returns {JSX.Element}
 */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

/**
 * @typedef {Object} CardHeaderProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 */
/**
 * The header section of a card, typically containing a title and description.
 * @param {CardHeaderProps} props
 * @returns {JSX.Element}
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * @typedef {Object} CardTitleProps
 * @extends {React.HTMLAttributes<HTMLHeadingElement>}
 */
/**
 * The title of the card, usually a heading element.
 * @param {CardTitleProps} props
 * @returns {JSX.Element}
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * @typedef {Object} CardDescriptionProps
 * @extends {React.HTMLAttributes<HTMLParagraphElement>}
 */
/**
 * The description or subtitle of the card.
 * @param {CardDescriptionProps} props
 * @returns {JSX.Element}
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * @typedef {Object} CardContentProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 */
/**
 * The main content area of a card.
 * @param {CardContentProps} props
 * @returns {JSX.Element}
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * @typedef {Object} CardFooterProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 */
/**
 * The footer section of a card, typically for actions or supplementary information.
 * @param {CardFooterProps} props
 * @returns {JSX.Element}
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export {
  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent,
}


