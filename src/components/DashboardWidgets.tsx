'use client'

import React, { useEffect, useState } from 'react'

export const DashboardWidgets = () => {
  const [stats, setStats] = useState({
    posts: 0,
    services: 0,
    users: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsRes, servicesRes, usersRes] = await Promise.all([
          fetch('/api/posts?limit=1'),
          fetch('/api/services?limit=1'),
          fetch('/api/users?limit=1')
        ]);
        
        const postsData = await postsRes.json();
        const servicesData = await servicesRes.json();
        const usersData = await usersRes.json();

        setStats({
          posts: postsData.totalDocs || 0,
          services: servicesData.totalDocs || 0,
          users: usersData.totalDocs || 0,
          loading: false
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>Resumen General</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#0a0a0a', 
          border: '1px solid #1f1f1f', 
          borderRadius: '8px',
          borderTop: '3px solid #dcea22'
        }}>
          <h3 style={{ color: '#a3a3a3', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Artículos (Blog)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginTop: '0.5rem' }}>
            {stats.loading ? '...' : stats.posts}
          </p>
        </div>

        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#0a0a0a', 
          border: '1px solid #1f1f1f', 
          borderRadius: '8px',
          borderTop: '3px solid #dcea22'
        }}>
          <h3 style={{ color: '#a3a3a3', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Servicios</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginTop: '0.5rem' }}>
            {stats.loading ? '...' : stats.services}
          </p>
        </div>

        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#0a0a0a', 
          border: '1px solid #1f1f1f', 
          borderRadius: '8px',
          borderTop: '3px solid #dcea22'
        }}>
          <h3 style={{ color: '#a3a3a3', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Usuarios</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginTop: '0.5rem' }}>
            {stats.loading ? '...' : stats.users}
          </p>
        </div>

        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#0a0a0a', 
          border: '1px solid #1f1f1f', 
          borderRadius: '8px',
          borderTop: '3px solid #dcea22'
        }}>
          <h3 style={{ color: '#a3a3a3', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado del Sistema</h3>
          <p style={{ fontSize: '1.25rem', fontWeight: '500', color: '#00ff9d', marginTop: '0.75rem' }}>● Óptimo</p>
        </div>

      </div>
    </div>
  )
}
