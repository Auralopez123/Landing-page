import React, { useState, useEffect } from 'react';
import '../css/UserProfile.css';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please login.');
        }

        const response = await fetch('https://stock-ia.duckdns.org/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Token inválido o expirado. Por favor, inicie sesión de nuevo.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.status === 'success') {
          setUserData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch user profile');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="user-profile"><p>Cargando perfil...</p></div>;
  }

  if (error) {
    return <div className="user-profile"><p>Error al cargar el perfil: {error}</p></div>;
  }

  if (!userData) {
    return <div className="user-profile"><p>No se encontraron datos del usuario.</p></div>;
  }

  return (
    <div className="user-profile">
      <h2>👤 Perfil de Usuario</h2>
      <div className="user-info">
        <p><strong>Nombre:</strong> {userData.full_name}</p>
        <p><strong>Correo:</strong> {userData.email}</p>
        <p><strong>Compañía:</strong> {userData.company_name}</p>
        <p><strong>Teléfono:</strong> {userData.phone}</p>
      </div>
    </div>
  );
}



