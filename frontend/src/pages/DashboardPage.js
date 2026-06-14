import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserProperties, deleteProperty } from '../services/api';

const DashboardPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchProperties();
  }, [isAuthenticated, navigate]);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserProperties();
      setProperties(response.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load your properties.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      try {
        await deleteProperty(propertyId);
        setProperties(properties.filter(p => p._id !== propertyId));
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete property. You can only delete your own listings.');
      }
    }
  };

  const handleEdit = (propertyId) => {
    navigate(`/edit-property/${propertyId}`);
  };

  const defaultImage = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=200&fit=crop';

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', maxWidth: '500px', margin: '3rem auto', background: 'white', borderRadius: '20px' }}>
        <div style={{ fontSize: '3rem' }}>⚠️</div>
        <h2 style={{ color: '#e74c3c' }}>Error</h2>
        <p>{error}</p>
        <button onClick={fetchProperties} style={{ padding: '10px 24px', background: '#667eea', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', color: '#1a1a2e' }}>📋 My Listings</h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Manage your property portfolio</p>
        </div>
        <button
          onClick={() => navigate('/create-property')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          + Add New Property
        </button>
      </div>

      {properties.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏠</div>
          <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem' }}>No properties yet</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>You haven't listed any properties. Click the button above to create your first listing.</p>
          <button
            onClick={() => navigate('/create-property')}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Create First Listing
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {properties.map((property) => (
            <div key={property._id} style={{
              background: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s'
            }}>
              <img 
                src={property.imageUrls?.[0] || defaultImage} 
                alt={property.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#1a1a2e' }}>{property.title}</h3>
                <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '0.9rem' }}>📍 {property.location?.city}, {property.location?.country}</p>
                <p style={{ margin: '0 0 16px 0', fontSize: '1.3rem', fontWeight: '700', color: '#667eea' }}>{property.price?.toLocaleString()} FCFA</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => handleEdit(property._id)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(property._id)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;