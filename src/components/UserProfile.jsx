import React from 'react';
import '../css/UserProfile.css';

export default function UserProfile() {
  const userData = {
    nombre: "Aura Cristona López",
    email: "auracristonalopez@gmail.com",
    compania: "StockIA",
    telefono: "+57 3100000000"
  };

  return (
    <div className="user-profile">
      <h2>👤 Perfil de Usuario</h2>
      <div className="user-info">
        <p><strong>Nombre:</strong> {userData.nombre}</p>
        <p><strong>Correo:</strong> {userData.email}</p>
        <p><strong>Compañía:</strong> {userData.compania}</p>
        <p><strong>Teléfono:</strong> {userData.telefono}</p>
      </div>
    </div>
  );
}



