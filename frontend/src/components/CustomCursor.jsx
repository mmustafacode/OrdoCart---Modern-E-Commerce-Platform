import { useState, useEffect } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Check if hovering over clickable elements
            const target = e.target;
            const isClickable =
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button');

            setIsPointer(!!isClickable);
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    if (isHidden) return null;

    return (
        <>
            {/* Main Dot */}
            <div
                className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%)`,
                }}
            >
                <div className={`
                    bg-white rounded-full transition-all duration-300 ease-out
                    ${isPointer ? 'w-4 h-4' : 'w-2 h-2'}
                `} />
            </div>

            {/* Follower Ring */}
            <div
                className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%)`,
                    transition: 'left 0.1s ease-out, top 0.1s ease-out, width 0.3s, height 0.3s'
                }}
            >
                <div className={`
                    border border-white rounded-full transition-all duration-300
                    ${isPointer ? 'w-12 h-12 opacity-50 bg-white/20' : 'w-8 h-8 opacity-80'}
                `} />
            </div>

            {/* Global CSS to hide default cursor on non-touch devices */}
            <style>{`
                @media (min-width: 768px) {
                    body, a, button, input {
                        cursor: none !important;
                    }
                }
            `}</style>
        </>
    );
};

export default CustomCursor;
