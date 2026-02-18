"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

const StackedLogos = ({
  logoGroups,
  duration = 30,
  stagger = 0,
  logoWidth = "200px",
  className,
}) => {
  const itemCount = logoGroups[0]?.length || 0;
  const columns = logoGroups.length;
  const containerRef = React.useRef(null);
  const gridRef = React.useRef(null);

  const handleMouseMove = React.useCallback((e) => {
    if (!containerRef.current || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("stacked-logos relative w-full", className)}
      style={{
        "--duration": duration,
        "--items": itemCount,
        "--lists": columns,
        "--stagger": stagger,
        "--logo-width": logoWidth,
      }}
      onMouseMove={handleMouseMove}
    >
      <div ref={gridRef} className="stacked-logos-grid" style={{ gridTemplateColumns: `repeat(${columns}, ${logoWidth})` }}>
        {/* Background glow */}
        <div 
          className="stacked-logos__glow"
          style={{ 
            background: 'radial-gradient(500px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(192,181,150,0.15), transparent 70%)' 
          }} 
        />
        
        {/* Border glow */}
        <div 
          className="stacked-logos__border-glow"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(192,181,150,1), transparent 40%)',
            maskImage: `repeating-linear-gradient(to right, transparent, transparent calc(${logoWidth} - 1px), black calc(${logoWidth} - 1px), black ${logoWidth}), linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)`,
            WebkitMaskImage: `repeating-linear-gradient(to right, transparent, transparent calc(${logoWidth} - 1px), black calc(${logoWidth} - 1px), black ${logoWidth}), linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)`,
            maskComposite: 'add',
          }} 
        />
        
        {/* Left edge glow */}
        <div 
          className="stacked-logos__edge-glow"
          style={{ 
            background: 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(192,181,150,1), transparent 40%)' 
          }} 
        />

        {logoGroups.map((logos, groupIndex) => (
          <div 
            key={groupIndex} 
            className="stacked-logos__cell"
            style={{ "--index": groupIndex, gridTemplate: "1fr / 1fr" }}
          >
            {/* Border lines */}
            <div className="stacked-logos__border-right" />
            <div className="stacked-logos__border-bottom" />
            <div className="stacked-logos__border-top" />
            {groupIndex === 0 && <div className="stacked-logos__border-left" />}

            {logos.map((logo, logoIndex) => (
              <div 
                key={logoIndex} 
                className="stacked-logos__item"
                style={{ "--i": logoIndex }}
              >
                <div className="stacked-logos__logo">
                  {logo}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

StackedLogos.displayName = "StackedLogos";
export default StackedLogos;
