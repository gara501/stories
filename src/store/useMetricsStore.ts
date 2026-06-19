import { create } from 'zustand'

interface Metrics {
  etica: number
  supervivencia: number
  liderazgo: number
  humanidad: number
}

interface MetricsState {
  metrics: Metrics
  updateMetrics: (deltas: Partial<Metrics>) => void
  resetMetrics: () => void
}

const initialMetrics: Metrics = {
  etica: 0,
  supervivencia: 0,
  liderazgo: 0,
  humanidad: 0,
}

export const useMetricsStore = create<MetricsState>((set) => ({
  metrics: { ...initialMetrics },
  updateMetrics: (deltas) =>
    set((state) => ({
      metrics: {
        etica: state.metrics.etica + (deltas.etica ?? 0),
        supervivencia: state.metrics.supervivencia + (deltas.supervivencia ?? 0),
        liderazgo: state.metrics.liderazgo + (deltas.liderazgo ?? 0),
        humanidad: state.metrics.humanidad + (deltas.humanidad ?? 0),
      },
    })),
  resetMetrics: () => set({ metrics: { ...initialMetrics } }),
}))
