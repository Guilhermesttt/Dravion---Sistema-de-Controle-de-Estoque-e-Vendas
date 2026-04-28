"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * @typedef {Object} TabsProps
 * @extends {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>}
 */
/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 * @param {TabsProps} props
 * @returns {JSX.Element}
 */
const Tabs = TabsPrimitive.Root

/**
 * @typedef {Object} TabsListProps
 * @extends {React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>}
 */
/**
 * A container for a set of tab triggers.
 * @param {TabsListProps} props
 * @returns {JSX.Element}
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * @typedef {Object} TabsTriggerProps
 * @extends {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>}
 */
/**
 * A control that, when activated, displays its associated tab panel.
 * @param {TabsTriggerProps} props
 * @returns {JSX.Element}
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * @typedef {Object} TabsContentProps
 * @extends {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>}
 */
/**
 * The content associated with a tab trigger.
 * @param {TabsContentProps} props
 * @returns {JSX.Element}
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }


