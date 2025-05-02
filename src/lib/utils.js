
/**
 * Merges multiple class names into a single string
 */
export function cn(...args) {
  return args.filter(Boolean).join(" ");
}
