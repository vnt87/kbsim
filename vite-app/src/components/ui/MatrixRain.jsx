import React, { useEffect, useRef, useState } from 'react';

export function MatrixRain({
    className = "",
    style = {},
    speed = 100, // Speed in ms
    charSize = 16,
    activeColor = '#0F0',
    passiveColor = 'rgba(0, 255, 0, 0.5)',
}) {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        const columns = Math.floor(dimensions.width / charSize);
        const drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -100)); // Start above screen randomly

        // Characters to use (Matrix Katakana + Latin)
        const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        const draw = () => {
            // Semi-transparent black to create fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${charSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = chars[Math.floor(Math.random() * chars.length)];

                // Color logic: Bright head, dimmer tail
                // For simplicity here, just using green, but could be enhanced
                ctx.fillStyle = Math.random() > 0.95 ? '#FFF' : activeColor;

                ctx.fillText(text, i * charSize, drops[i] * charSize);

                // Reset drop or move down
                if (drops[i] * charSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50); // Hardcoded standard animation loop ~30-60fps equivalent feeling

        return () => clearInterval(interval);
    }, [dimensions, charSize, activeColor]);

    return (
        <canvas
            ref={canvasRef}
            className={`block fixed top-0 left-0 w-full h-full pointer-events-none -z-10 ${className}`}
            style={{ ...style, backgroundColor: 'black' }}
        />
    );
}
