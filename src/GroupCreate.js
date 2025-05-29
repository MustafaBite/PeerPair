import React, { useState } from 'react';

function GroupCreate() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {!showForm ? (
        <button onClick={() => { 
          console.log("Butona tıklandı!"); 
          setShowForm(true);
        }}>Yeni Grup Oluştur</button>
      ) : (
        <div>
          <p>Form açıldı!</p>
          <button onClick={() => setShowForm(false)}>Kapat</button>
        </div>
      )}
    </div>
  );
}

export default GroupCreate;