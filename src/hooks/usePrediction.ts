import { useState, useCallback } from "react";
import { Prediction, predictFruit } from "../services/prediction";

// Hook que conecta la UI con el servicio y maneja estados de carga/error.
export function usePrediction() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (imageUri: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const prediction = await predictFruit(imageUri);
      setResult(prediction);
    } catch (e: any) {
      setError(e?.message ?? "No se pudo analizar la imagen");
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { loading, result, error, analyze, reset };
}
