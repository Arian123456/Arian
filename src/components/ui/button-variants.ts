import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-gray-800 shadow-soft hover:shadow-medium",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-black bg-background hover:bg-black hover:text-white",
        secondary:
          "bg-gray-800 text-white hover:bg-gray-700",
        ghost: "hover:bg-black/10 hover:text-black",
        link: "text-black underline-offset-4 hover:underline",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-soft",
        hero: "bg-black text-white hover:shadow-medium transform hover:scale-[1.02] font-semibold",
        gradient: "bg-gradient-to-r from-gray-800 to-black text-white hover:shadow-medium",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
