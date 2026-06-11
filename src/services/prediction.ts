import { config } from "../config";

// --- Tipos del resultado ---
export type FruitLabel = "Saludable" | "Podrido";

export interface Prediction {
  label: FruitLabel;
  confidence: number; // 0..1
}

// --- Implementacion SIMULADA (sin backend): para probar la UI ---
async function predictMock(): Promise<Prediction> {
  await new Promise((r) => setTimeout(r, 1400)); // simula latencia
  const healthy = Math.random() > 0.5;
  return {
    label: healthy ? "Saludable" : "Podrido",
    confidence: 0.7 + Math.random() * 0.29,
  };
}

//   respuesta JSON: { "label": "Saludable"|"Podrido", "confidence": 0..1 }
async function predictApi(imageUri: string): Promise<Prediction> {
  const form = new FormData();
  form.append("file", {
    uri: imageUri,
    name: "fruit.jpg",
    type: "image/jpeg",
  } as any);

  const res = await fetch(`${config.API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: form,
  });

  if (!res.ok) {
    throw new Error(`El servidor respondio ${res.status}`);
  }

  const json = await res.json();
  return {
    label: json.label as FruitLabel,
    confidence: Number(json.confidence),
  };
}

// --- Funcion unica que usa la app. Elige mock o real segun config. ---
export function predictFruit(imageUri: string): Promise<Prediction> {
  return config.USE_MOCK ? predictMock() : predictApi(imageUri);
}
