"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { ArrowUp, Paperclip } from "lucide-react";

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90 disabled:bg-gray-300 disabled:text-white-200",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

interface PromptInputProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  onFileUpload?: (files: FileList) => void;
  disabled?: boolean;
  className?: string;
  externalValue?: string;
}

const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
  ({ placeholder = "Type your message...", onSubmit, onChange, onFileUpload, disabled = false, className, externalValue }, ref) => {
    const [value, setValue] = React.useState("");
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (externalValue !== undefined) setValue(externalValue);
    }, [externalValue]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (value.trim() && onSubmit) {
        onSubmit(value.trim());
        setValue("");
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (value.trim() && onSubmit) {
          onSubmit(value.trim());
          setValue("");
        }
      }
    };

    const handleFileUpload = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0 && onFileUpload) {
        onFileUpload(files);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full max-w-2xl mx-auto items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 shadow-lg shadow-slate-200/50 dark:shadow-black/20 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all",
          className
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleFileUpload}
          disabled={disabled}
          className="h-8 w-8 shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
        >
          <Paperclip size={16} />
          <span className="sr-only">Upload file</span>
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx,.txt"
          multiple
          className="hidden"
        />
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            type="submit"
            size="icon"
            disabled={disabled || !value.trim()}
            className="h-8 w-8 shrink-0 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400"
          >
            <ArrowUp size={16} />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    );
  }
);
PromptInput.displayName = "PromptInput";

export { PromptInput, Button, buttonVariants };
