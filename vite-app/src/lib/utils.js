/**
 * Utility function for merging class names
 * Simple implementation without clsx/tailwind-merge dependencies
 */
export function cn(...inputs) {
    return inputs
        .flat()
        .filter((x) => typeof x === 'string' && x.length > 0)
        .join(' ')
}
