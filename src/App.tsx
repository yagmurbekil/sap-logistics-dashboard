import React, { useEffect, useState } from 'react';
import { mockMovements, type LogisticMovement } from './data';
import { BarChart3, Package, AlertTriangle, ArrowUpRight, RefreshCw } from 'lucide-react';

export default function App() {
  const [movements, setMovements] = useState<LogisticMovement[]>([]);
  
  const [selectedPlant, setSelectedPlant] = useState<string>('All');

  useEffect(() => {
    fetch('http://localhost:3001/movements')
      .then(response => response.json())
      .then(data => setMovements(data))
      .catch(error => console.error('SAP sunucu hatası:', error));
  }, []); 

  const filteredMovements = selectedPlant === 'All' 
    ? movements 
    : movements.filter(m => m.plant === selectedPlant);

  const totalMalGiris_101 = filteredMovements
    .filter(m => m.movementType === '101')
    .reduce((sum, m) => sum + m.quantity, 0);

  const totalIptal_102 = filteredMovements
    .filter(m => m.movementType === '102')
    .reduce((sum, m) => sum + m.quantity, 0);

  const totalUretimCikis_261 = filteredMovements
    .filter(m => m.movementType === '261')
    .reduce((sum, m) => sum + m.quantity, 0);

  const handleMipTrigger = (materialName: string) => {
    alert(`MİP Algoritması Tetiklendi!\n\n"${materialName}" ürünü için otomatik Satın Alma Talebi oluşturuldu.`);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '24px', fontFamily: 'sans-serif' }}>
      
      {/* Üst Başlık Alanı */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 style={{ color: '#3b82f6' }} /> Yagmur | SAP MM Analiz Paneli
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>SAP Veri Modelleri Üzerinden Gerçek Zamanlı Lojistik Takibi</p>
        </div>
        <div>
          <label style={{ fontSize: '14px', marginRight: '8px', color: '#94a3b8' }}>Üretim Yeri (Plant):</label>
          <select 
            style={{ backgroundColor: '#1e293b', color: 'white', border: '1px solid #475569', padding: '6px 12px', borderRadius: '6px' }}
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.target.value)}
          >
            <option value="All">Tüm Fabrikalar</option>
            <option value="1000">Plant 1000 (Merkez)</option>
            <option value="1100">Plant 1100 (Eskişehir)</option>
          </select>
        </div>
      </div>

      {/* KPI Kartları - Yan Yana Düzen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        {/* 101 Kartı */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '16px', borderRadius: '12px' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', margin: 0 }}>Toplam Mal Girişi (İTü: 101)</p>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#10b981' }}>{totalMalGiris_101} <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'normal' }}>Birim</span></h3>
        </div>

        {/* 261 Kartı */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '16px', borderRadius: '12px' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', margin: 0 }}>Üretim Tüketimi (İTü: 261)</p>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#3b82f6' }}>{totalUretimCikis_261} <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'normal' }}>Birim</span></h3>
        </div>

        {/* 102 Kartı */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '16px', borderRadius: '12px' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', margin: 0 }}>Ters Kayıt / İptal (İTü: 102)</p>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#f43f5e' }}>{totalIptal_102} <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'normal' }}>Birim</span></h3>
        </div>

      </div>

      {/* Tablo Alanı */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' }}>
          <RefreshCw size={18} style={{ color: '#3b82f6' }} /> Stok ve İhtiyaç Planlama Takip Matrisi
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8', fontSize: '14px' }}>
                <th style={{ paddingBottom: '12px' }}>Malzeme Kodu</th>
                <th style={{ paddingBottom: '12px' }}>Kısa Metin</th>
                <th style={{ paddingBottom: '12px', textAlign: 'center' }}>İTü</th>
                <th style={{ paddingBottom: '12px', textAlign: 'center' }}>Miktar</th>
                <th style={{ paddingBottom: '12px' }}>Tedarikçi</th>
                <th style={{ paddingBottom: '12px' }}>Teslimat</th>
                <th style={{ paddingBottom: '12px', textAlign: 'right' }}>MİP Durumu</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '14px' }}>
              {filteredMovements.map((m) => {
                const isCritical = m.currentStock < m.safetyStock;
                return (
                  <tr key={m.id} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '12px 0', fontFamily: 'monospace', color: '#60a5fa' }}>{m.material}</td>
                    <td style={{ padding: '12px 0' }}>{m.materialDesc}</td>
                    <td style={{ padding: '12px 0', textAlign: 'center' }}>
                      <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', backgroundColor: m.movementType === '101' ? '#065f46' : m.movementType === '102' ? '#991b1b' : '#1e3a8a', color: 'white' }}>
                        {m.movementType}
                      </span>
                    </td>
                    <td style={{ padding: '12px 0', textAlign: 'center', fontWeight: 'bold' }}>{m.quantity} {m.unit}</td>
                    <td style={{ padding: '12px 0', color: '#94a3b8' }}>{m.vendor}</td>
                    <td style={{ padding: '12px 0', color: '#cbd5e1' }}>{m.incoterm}</td>
                    <td style={{ padding: '12px 0', textAlign: 'right' }}>
                      {isCritical ? (
                        <button 
                          onClick={() => handleMipTrigger(m.materialDesc)}
                          style={{ backgroundColor: '#d97706', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          MİP Tetikle
                        </button>
                      ) : (
                        <span style={{ color: '#64748b', fontSize: '12px' }}>Stok Yeterli</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}