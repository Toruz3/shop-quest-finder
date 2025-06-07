
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="shadow-md border border-border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-base font-medium text-gray-900 dark:text-gray-100">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-sm text-gray-600 dark:text-gray-300">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className="fixed bottom-20 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-20 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  )
}
