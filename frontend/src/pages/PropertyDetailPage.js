import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../services/api';
import { useAuth } from '../context/AuthContext';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await getPropertyById(id);
      setProperty(response.data);
    } catch (err) {
      setError('Property not found');
    } finally {
      setLoading(false);
    }
  };

  const defaultImage = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop';

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Property not found</h2>
        <button onClick={() => navigate('/')} style={{ padding: '10px 24px', background: '#667eea', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '1rem' }}>← Back</button>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <img 
            src={property.imageUrls?.[0] || defaultImage} 
            alt={property.title}
            style={{ width: '100%', borderRadius: '20px', objectFit: 'cover' }}
          />
        </div>
        
        <div>
          <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{property.propertyType}</span>
          <h1 style={{ margin: '1rem 0 0.5rem', color: '#1a1a2e' }}>{property.title}</h1>
          <p style={{ color: '#666', marginBottom: '1rem' }}>📍 {property.location?.city}, {property.location?.country}</p>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: '#667eea', marginBottom: '1rem' }}>{property.price?.toLocaleString()} FCFA</p>
          <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1rem' }}>
            <h3>Description</h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>{property.description}</p>
          </div>
          
          {isAuthenticated && user?._id === property.author?._id && (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => navigate(`/edit-property/${property._id}`)} style={{ flex: 1, padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>Edit Property</button>
              <button onClick={() => navigate('/dashboard')} style={{ flex: 1, padding: '12px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>View My Listings</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;