// src/components/ui/LoadingSpinner.jsx
export const LoadingSpinner = ({ size = "default", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full border-2 border-bs-blue-500/30 border-t-bs-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}