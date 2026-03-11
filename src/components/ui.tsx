import {cn} from "../lib/utils"
import {ButtonHTMLAttributes, forwardRef, HTMLAttributes, InputHTMLAttributes} from "react";

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "destructive" | "outline"
}>(
    ({className, variant = "default", ...props}, ref) => {
      const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-background hover:bg-muted",
      }
      return (
          <button ref={ref}
                  className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2", variants[variant], className)} {...props} />
      )
    }
)
Button.displayName = "Button"

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({className, type, ...props}, ref) => {
      return (
          <input type={type}
                 className={cn("flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50", className)}
                 ref={ref} {...props} />
      )
    }
)
Input.displayName = "Input"

export const Card = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn("rounded-lg border border-border bg-background text-foreground shadow-sm", className)} {...props} />
)
export const CardHeader = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
)
export const CardTitle = ({className, ...props}: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
)
export const CardContent = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("p-6 pt-0", className)} {...props} />
)