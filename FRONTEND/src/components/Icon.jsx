export default function Icon({
  path,
  size = 18,
  color = "currentColor",
  stroke = false,
  strokeWidth = 2,
  className,
  style,
  animate = false,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={stroke ? "none" : color}
      stroke={stroke ? color : "none"}
      strokeWidth={stroke ? strokeWidth : 0}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        flexShrink: 0,
        transition: "all 0.2s ease",
        ...(animate && { transform: "scale(1)" }),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (animate) {
          e.currentTarget.style.transform = "scale(1.15)";
        }
      }}
      onMouseLeave={(e) => {
        if (animate) {
          e.currentTarget.style.transform = "scale(1)";
        }
      }}
    >
      <path d={path} />
    </svg>
  );
}