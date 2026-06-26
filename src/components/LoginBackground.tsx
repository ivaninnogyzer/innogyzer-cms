'use client'

import React, { useEffect, useRef } from 'react'
import './LoginBackground.scss'

export const LoginBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.body.classList.add('is-login-page')

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const numParticles = 800;
    let particles: { baseX: number, baseY: number, baseZ: number, cx: number, cy: number, cz: number, vx: number, vy: number, vz: number }[] = [];
    let sphereRadius = Math.min(width, height) * 0.4;
    
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    
    for (let i = 0; i < numParticles; i++) {
      const y = 1 - (i / (numParticles - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y); 
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      particles.push({
        baseX: x, baseY: y, baseZ: z,
        cx: x, cy: y, cz: z,
        vx: 0, vy: 0, vz: 0
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      sphereRadius = Math.min(width, height) * 0.4;
    };
    let mouse = { x: -1000, y: -1000 };
    let isExploded = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      const dx = mouse.x - width / 2;
      const dy = mouse.y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < sphereRadius && !isExploded) {
        isExploded = true;
        particles.forEach(p => {
           const speed = Math.random() * 40 + 20;
           p.vx = p.cx * speed;
           p.vy = p.cy * speed;
           p.vz = p.cz * speed;
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const deltaAngleY = 0.003; 
      const deltaAngleX = 0.001;

      const centerX = width / 2;
      const centerY = height / 2;

      const dampening = 0.96;

      particles.forEach((p) => {
        let rx = p.cx;
        let ry = p.cy * Math.cos(deltaAngleX) - p.cz * Math.sin(deltaAngleX);
        let rz = p.cy * Math.sin(deltaAngleX) + p.cz * Math.cos(deltaAngleX);

        p.cx = rx * Math.cos(deltaAngleY) + rz * Math.sin(deltaAngleY);
        p.cy = ry;
        p.cz = -rx * Math.sin(deltaAngleY) + rz * Math.cos(deltaAngleY);

        p.cx += p.vx / sphereRadius;
        p.cy += p.vy / sphereRadius;
        p.cz += p.vz / sphereRadius;

        p.vx *= dampening;
        p.vy *= dampening;
        p.vz *= dampening;

        const finalScale = 1000 / (1000 + p.cz * sphereRadius);
        const finalScreenX = centerX + p.cx * sphereRadius * finalScale;
        const finalScreenY = centerY + p.cy * sphereRadius * finalScale;

        const zIndex = p.cz; 
        let opacity = Math.max(0.05, (zIndex + 1) / 2);

        const marginY = height * 0.15;
        
        if (finalScreenY < marginY) {
          const fadeOut = finalScreenY / marginY;
          opacity *= Math.max(0, fadeOut);
        } else if (finalScreenY > height - marginY) {
          const fadeOut = (height - finalScreenY) / marginY;
          opacity *= Math.max(0, fadeOut);
        }

        const radius = Math.max(0.5, 3 * opacity * finalScale);

        ctx.beginPath();
        ctx.arc(finalScreenX, finalScreenY, radius, 0, Math.PI * 2);
        // Paint the particles with a hint of Innogyzer yellow when bright
        ctx.fillStyle = `rgba(220, 234, 34, ${opacity * 0.7})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      document.body.classList.remove('is-login-page')
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    }
  }, [])

  return (
    <>
      <div className="custom-login-bg"></div>
      <canvas ref={canvasRef} className="custom-login-canvas" />
    </>
  )
}
