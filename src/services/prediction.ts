import { config } from '../config';

// =====================================================================
//  Predecir una fruta (28 clases: fruta + estado).
//  El backend devuelve: label, fruta, estado, apta, confidence,
//  low_confidence y top3. Aqui definimos el tipo y el parsing.
// =====================================================================

export interface TopItem {
  clase: string;
  fruta: string;
  estado: string;
  prob: number;
}

export interface Prediction {
  label: string;          // clase cruda, ej. "Apple__Rotten"
  fruta: string;          // "Manzana"
  estado: string;         // "Saludable" | "Podrido"
  apta: boolean;          // true si Saludable
  confidence: number;     // 0..1
  lowConfidence: boolean; // true si el modelo no esta seguro (quiza no es fruta)
  top3: TopItem[];
}

// --- Implementacion SIMULADA (sin backend): para probar la UI ---
async function predictMock(): Promise<Prediction> {
  await new Promise((r) => setTimeout(r, 1200));
  const muestras = [
    { fruta: 'Manzana', estado: 'Podrido' },
    { fruta: 'Banana', estado: 'Saludable' },
    { fruta: 'Fresa', estado: 'Saludable' },
    { fruta: 'Tomate', estado: 'Podrido' },
  ];
  const m = muestras[Math.floor(Math.random() * muestras.length)];
  return {
    label: `${m.fruta}__${m.estado}`,
    fruta: m.fruta,
    estado: m.estado,
    apta: m.estado === 'Saludable',
    confidence: 0.78 + Math.random() * 0.2,
    lowConfidence: false,
    top3: [],
  };
}

// --- Implementacion REAL: envia la foto al backend FastAPI ---
async function predictApi(imageUri: string): Promise<Prediction> {
  const form = new FormData();
  form.append('file', { uri: imageUri, name: 'fruit.jpg', type: 'image/jpeg' } as any);

  const res = await fetch(`${config.API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: form,
  });
  if (!res.ok) throw new Error(`El servidor respondio ${res.status}`);

  const j = await res.json();
  return {
    label: j.label,
    fruta: j.fruta,
    estado: j.estado,
    apta: !!j.apta,
    confidence: Number(j.confidence),
    lowConfidence: !!j.low_confidence,
    top3: Array.isArray(j.top3) ? j.top3 : [],
  };
}

export function predictFruit(imageUri: string): Promise<Prediction> {
  return config.USE_MOCK ? predictMock() : predictApi(imageUri);
}
