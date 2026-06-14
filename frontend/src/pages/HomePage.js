import React, { useState, useEffect } from 'react';
import { getAllProperties } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [filterValues, setFilterValues] = useState({ city: '', minPrice: '', maxPrice: '' });

  const fetchProperties = async (filterParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProperties(filterParams);
      setProperties(response.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load properties. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(filters);
  }, [filters]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setFilterValues({
      city: newFilters.city || '',
      minPrice: newFilters.minPrice || '',
      maxPrice: newFilters.maxPrice || ''
    });
  };

  const handleReset = () => {
    setFilters({});
    setFilterValues({ city: '', minPrice: '', maxPrice: '' });
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#667eea', fontWeight: '500' }}>Loading properties...</p>
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
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem',
        maxWidth: '500px',
        margin: '3rem auto',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h2 style={{ color: '#e74c3c', marginBottom: '1rem' }}>Error</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>{error}</p>
        <button 
          onClick={() => fetchProperties(filters)}
          style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Filter Sidebar */}
        <div style={{ width: '320px', flexShrink: 0 }}>
          <FilterSidebar 
            onFilter={handleFilter} 
            onReset={handleReset}
            initialCity={filterValues.city}
            initialMinPrice={filterValues.minPrice}
            initialMaxPrice={filterValues.maxPrice}
          />
        </div>

        {/* Properties Grid */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '1.8rem', 
              fontWeight: '700',
              color: '#1a1a2e'
            }}>
              🏘️ All Properties
            </h2>
            <p style={{ 
              margin: 0, 
              color: '#666',
              background: '#f5f5f5',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              {properties.length} property{properties.length !== 1 ? 's' : ''} found
            </p>
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
              <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem' }}>No properties found</h3>
              <p style={{ color: '#666' }}>Try adjusting your search filters or check back later.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem'
            }}>
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;