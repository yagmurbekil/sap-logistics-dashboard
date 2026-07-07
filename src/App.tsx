import React, { useState } from 'react';
import { mockMovements, type LogisticMovement } from './data';
import { BarChart3, Package, AlertTriangle, ArrowDownRight, ArrowUpRight, RefreshCw } from 'lucide-react';

export default function App() {
  const [movements, setMovements] = useState<LogisticMovement[]>(mockMovements);
  const [selectedPlant, setSelectedPlant] = useState<string>('All');

  // Filtreleme Mantığı: Seçilen fabrikaya göre verileri süzüyoruz
  const filteredMovements = selectedPlant === 'All' 
    ? movements 
    : movements.filter(m => m.plant === selectedPlant);

  // SAP Lojistik Metrikleri Hesaplama 
  const totalMalGiris_101 = filteredMovements
    .filter(m => m.movementType === '101')
    .reduce((sum, m) => sum + m.quantity, 0);

  const totalIptal_102 = filteredMovements
    .filter(m => m.movementType === '102')
    .reduce((sum, m) => sum + m.quantity, 0);

  const totalUretimCikis_261 = filteredMovements
    .filter(m => m.movementType === '261')
    .reduce((sum, m) => sum + m.quantity, 0);

  // MİP (MRP) Tetikleme Fonksiyonu: Güvenlik stoğu altına düşen ürün için
  const handleMipTrigger = (materialName: string) => {
    alert(`MİP Algoritması Tetiklendi!\n\n"${materialName}" ürünü için güvenlik stoğu kritik seviyede olduğundan arka planda otomatik Satın Alma Talebi (Purchase Requisition) oluşturuldu.`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <BarChart3 className="text-blue-500" /> Yagmur <span className="text-slate-400 font-normal text-xl">| SAP MM Analiz Paneli</span>
          </h1>
          <p className="text-slate-400 mt-1">SAP Veri Modelleri Üzerinden Gerçek Zamanlı Lojistik ve İhtiyaç Planlaması</p>
        </div>
        
        {/* Fabrika Filtresi (Organizasyon Yapısı) */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-400">Üretim Yeri (Plant):</label>
          <select 
            className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.target.value)}
          >
            <option value="All">Tüm Fabrikalar</option>
            <option value="1000">Plant 1000 (Merkez)</option>
            <option value="1100">Plant 1100 (Eskişehir)</option>
          </select>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 101 Giriş Kartı */}
        <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400 tracking-wider uppercase">Toplam Mal Girişi (İTü: 101)</p>
              <h3 className="text-3xl font-bold text-white mt-2">{totalMalGiris_101.toLocaleString()} <span className="text-sm font-normal text-slate-400">Birim</span></h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <ArrowUpRight size={24} />
            </div>
          </div>
          <div className="mt-4 text-xs text-emerald-400 font-medium">Tedarikçilerden depoya kabul edilen net miktarlar.</div>
        </div>

        {/* 261 Çıkış Kartı */}
        <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400 tracking-wider uppercase">Üretim Tüketimi (İTü: 261)</p>
              <h3 className="text-3xl font-bold text-white mt-2">{totalUretimCikis_261.toLocaleString()} <span className="text-sm font-normal text-slate-400">Birim</span></h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
              <Package size={24} />
            </div>
          </div>
          <div className="mt-4 text-xs text-blue-400 font-medium">Üretim bandına çekilen hammadde miktarı.</div>
        </div>

        {/* 102 İptal Kartı */}
        <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400 tracking-wider uppercase">Ters Kayıt / İptal (İTü: 102)</p>
              <h3 className="text-3xl font-bold text-rose-400 mt-2">{totalIptal_102.toLocaleString()} <span className="text-sm font-normal text-slate-400">Birim</span></h3>
            </div>
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-lg">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="mt-4 text-xs text-rose-400 font-medium">Kullanıcı hatası veya iade kaynaklı ters hareket hacmi.</div>
        </div>
      </section>

      {/* Main Content Area: SAP Malzeme Hareketi Rapor Tablosu */}
      <section className="bg-slate-800/30 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <RefreshCw size={20} className="text-blue-400 animate-spin-slow" /> Stok ve İhtiyaç Planlama Takip Matrisi
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-sm">
                <th className="pb-3 font-semibold">Malzeme Kodu</th>
                <th className="pb-3 font-semibold">Kısa Metin</th>
                <th className="pb-3 font-semibold text-center">İTü</th>
                <th className="pb-3 font-semibold text-center">Miktar</th>
                <th className="pb-3 font-semibold">Tedarikçi (BP)</th>
                <th className="pb-3 font-semibold">Teslimat Şekli</th>
                <th className="pb-3 font-semibold text-right">MİP Durumu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm">
              {filteredMovements.map((m) => {
                const isCritical = m.currentStock < m.safetyStock;
                return (
                  <tr key={m.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 font-mono font-medium text-blue-400">{m.material}</td>
                    <td className="py-4 text-slate-200">{m.materialDesc}</td>
                    <td className="py-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                        m.movementType === '101' ? 'bg-emerald-500/10 text-emerald-400' :
                        m.movementType === '102' ? 'bg-rose-500/10 text-rose-400' :
                        m.movementType === '261' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {m.movementType}
                      </span>
                    </td>
                    <td className="py-4 text-center font-semibold">{m.quantity} {m.unit}</td>
                    <td className="py-4 text-slate-400">{m.vendor}</td>
                    <td className="py-4 text-slate-300 font-medium">{m.incoterm}</td>
                    <td className="py-4 text-right">
                      {isCritical ? (
                        <button 
                          onClick={() => handleMipTrigger(m.materialDesc)}
                          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-2.5 py-1 rounded text-xs transition-colors shadow-sm animate-pulse"
                        >
                          MİP Tetikle
                        </button>
                      ) : (
                        <span className="text-slate-500 text-xs font-medium">Stok Yeterli</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}