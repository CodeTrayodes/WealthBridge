export const GradientText = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-gradient-to-r from-bs-blue-400 to-bs-purple-400",
    accent: "bg-gradient-to-r from-bs-blue-400 via-bs-purple-400 to-accent",
    hero: "bg-gradient-to-br from-white via-gray-100 to-gray-300"
  }

  return (
    <span className={`${variants[variant]} bg-clip-text text-transparent font-bold ${className}`}>
      {children}
    </span>
  )
}
