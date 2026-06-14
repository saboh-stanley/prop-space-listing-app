import React from 'react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const defaultImage = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop';
  
  const getPropertyTypeColor = (type) => {
    switch(type) {
      case 'Apartment': return { bg: '#e3f2fd', color: '#1976d2' };
      case 'House': return { bg: '#e8f5e9', color: '#388e3c' };
      case 'Studio': return { bg: '#fef3e8', color: '#f57c00' };
      default: return { bg: '#f3e5f5', color: '#7b1fa2' };
    }
  };

  const typeStyle = getPropertyTypeColor(property.propertyType);

  return (
    <div 
      onClick={() => navigate(`/property/${property._id}`)}
      style={{
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{ position: 'relative' }}>
        <img 
          src={property.imageUrls?.[0] || defaultImage} 
          alt={property.title}
          style={{
            width: '100%',
            height: '220px',
            objectFit: 'cover',
          }}
        />
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: typeStyle.bg,
          color: typeStyle.color,
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {property.propertyType}
        </span>
      </div>
      
      <div style={{ padding: '1.25rem' }}>
        <h3 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '1.2rem', 
          fontWeight: '600',
          color: '#1a1a2e'
        }}>
          {property.title}
        </h3>
        
        <p style={{ 
          margin: '0 0 8px 0', 
          color: '#666', 
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          📍 {property.location?.city}, {property.location?.country}
        </p>
        
        <p style={{ 
          margin: '12px 0 0 0', 
          fontSize: '1.5rem', 
          fontWeight: '700',
          color: '#667eea'
        }}>
          {property.price?.toLocaleString()} FCFA
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;