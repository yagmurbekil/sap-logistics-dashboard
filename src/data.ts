export interface LogisticMovement {
  id: string;
  material: string;
  materialDesc: string;
  plant: string;
  storageLocation: string;
  movementType: '101' | '102' | '261' | '601';
  quantity: number;
  unit: string;
  date: string;
  incoterm: string;
  vendor: string;
  safetyStock: number;
  currentStock: number;
}

export const mockMovements: LogisticMovement[] = [
  { id: "10001", material: "MAT-0092", materialDesc: "Çelik Somun 10mm", plant: "1000", storageLocation: "A001", movementType: "101", quantity: 500, unit: "ST", date: "2026-07-01", incoterm: "FOB", vendor: "Demir Çelik A.Ş.", safetyStock: 200, currentStock: 150 },
  { id: "10002", material: "MAT-0092", materialDesc: "Çelik Somun 10mm", plant: "1000", storageLocation: "A001", movementType: "102", quantity: 50, unit: "ST", date: "2026-07-02", incoterm: "FOB", vendor: "Demir Çelik A.Ş.", safetyStock: 200, currentStock: 150 },
  { id: "10003", material: "MAT-0145", materialDesc: "Bakır Kablo 2.5mm", plant: "1000", storageLocation: "B002", movementType: "101", quantity: 120, unit: "M", date: "2026-07-02", incoterm: "EXW", vendor: "Tekno Kablo Ltd.", safetyStock: 50, currentStock: 80 },
  { id: "10004", material: "MAT-0145", materialDesc: "Bakır Kablo 2.5mm", plant: "1000", storageLocation: "B002", movementType: "261", quantity: 30, unit: "M", date: "2026-07-03", incoterm: "EXW", vendor: "Tekno Kablo Ltd.", safetyStock: 50, currentStock: 80 },
  { id: "10005", material: "MAT-0881", materialDesc: "Asansör Motoru 15KW", plant: "1100", storageLocation: "C001", movementType: "101", quantity: 5, unit: "ST", date: "2026-07-05", incoterm: "DDP", vendor: "Volta Motor", safetyStock: 10, currentStock: 4 },
  { id: "10006", material: "MAT-0092", materialDesc: "Çelik Somun 10mm", plant: "1000", storageLocation: "A001", movementType: "261", quantity: 200, unit: "ST", date: "2026-07-06", incoterm: "FOB", vendor: "Demir Çelik A.Ş.", safetyStock: 200, currentStock: 150 },
  { id: "10007", material: "MAT-0544", materialDesc: "Poliüretan Sünger", plant: "1000", storageLocation: "A003", movementType: "601", quantity: 80, unit: "KG", date: "2026-07-07", incoterm: "CIF", vendor: "Köpük Kimya", safetyStock: 100, currentStock: 120 }
];