import React from 'react';
import { Plus } from 'lucide-react';

/**
 * Corner markers component - Places plus icons at each corner
 */
function CornerMarkers({ accentColor }) {
    const positions = [
        { className: 'top-0 -left-3' },
        { className: 'top-0 -right-3' },
        { className: 'bottom-0 -left-3' },
        { className: 'bottom-0 -right-3' },
    ];

    return (
        <div className="absolute z-20 inset-0 pointer-events-none">
            {positions.map((pos, index) => (
                <div
                    key={index}
                    className={`absolute ${pos.className}`}
                >
                    <Plus
                        className="animate-pulse"
                        style={{
                            color: accentColor,
                            filter: `drop-shadow(0 0 6px ${accentColor})`,
                        }}
                        size={20}
                        strokeWidth={1.5}
                    />
                </div>
            ))}
        </div>
    );
}

/**
 * Grid Background - Diagonal fade grid effect
 */
function GridBackground({ accentColor }) {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(to right, ${accentColor}15 1px, transparent 1px),
            linear-gradient(to bottom, ${accentColor}15 1px, transparent 1px)
          `,
                    backgroundSize: '32px 32px',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)',
                    maskImage:
                        'radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)',
                }}
            />
        </div>
    );
}

/**
 * SecureFrame - A cyberpunk-style frame wrapper with corner markers and grid background
 * Adapts to the app's theme system while providing a futuristic border effect
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to wrap
 * @param {string} props.accentColor - The accent color for corners and borders (adapts to theme)
 * @param {boolean} props.showGrid - Whether to show the grid background
 * @param {string} props.className - Additional CSS classes
 */
export function SecureFrame({
    children,
    accentColor = '#4ade80', // Default green-400
    showGrid = true,
    className = ''
}) {
    return (
        <div
            className={`relative ${className}`}
            style={{
                border: `1px dashed ${accentColor}40`, // 40 = 25% opacity in hex
            }}
        >
            {/* Corner Markers */}
            <CornerMarkers accentColor={accentColor} />

            {/* Grid Background */}
            {showGrid && <GridBackground accentColor={accentColor} />}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

export default SecureFrame;
