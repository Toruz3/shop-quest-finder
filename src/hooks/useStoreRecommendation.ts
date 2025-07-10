import { useMemo } from 'react';

interface Store {
  id: number;
  name: string;
  distance: string;
  distanceInKm: number;
  totalPrice: number;
  savings: number;
  isOpen: boolean;
  closingTime: string;
  address: string;
  rating?: number;
  services?: string[];
}

interface RecommendationScores {
  priceScore: number;
  distanceScore: number;
  timeScore: number;
  totalScore: number;
}

interface StoreWithScores extends Store {
  scores: RecommendationScores;
  recommendationReason: string;
}

export const useStoreRecommendation = (stores: Store[]) => {
  return useMemo(() => {
    if (stores.length === 0) return [];

    const maxPrice = Math.max(...stores.map(s => s.totalPrice));
    const minPrice = Math.min(...stores.map(s => s.totalPrice));
    const maxDistance = Math.max(...stores.map(s => s.distanceInKm));
    const minDistance = Math.min(...stores.map(s => s.distanceInKm));

    const storesWithScores: StoreWithScores[] = stores.map(store => {
      // Price score (0-100, higher is better = lower price)
      const priceScore = maxPrice === minPrice ? 100 : 
        ((maxPrice - store.totalPrice) / (maxPrice - minPrice)) * 100;

      // Distance score (0-100, higher is better = closer)
      const distanceScore = maxDistance === minDistance ? 100 : 
        ((maxDistance - store.distanceInKm) / (maxDistance - minDistance)) * 100;

      // Time score (0-100, higher is better)
      let timeScore = 50; // Default for unknown status
      if (store.isOpen) {
        const now = new Date();
        const currentHour = now.getHours();
        const closingHour = parseInt(store.closingTime.split(':')[0]);
        const hoursUntilClose = closingHour - currentHour;
        
        if (hoursUntilClose > 3) timeScore = 100;
        else if (hoursUntilClose > 1) timeScore = 75;
        else if (hoursUntilClose > 0) timeScore = 50;
        else timeScore = 25;
      } else {
        timeScore = 0;
      }

      // Weighted total score
      const totalScore = (priceScore * 0.4) + (distanceScore * 0.4) + (timeScore * 0.2);

      // Determine recommendation reason
      let recommendationReason = '';
      if (priceScore >= 80 && distanceScore >= 80) {
        recommendationReason = 'Ottimo prezzo e molto vicino';
      } else if (priceScore >= 90) {
        recommendationReason = 'Prezzo imbattibile';
      } else if (distanceScore >= 90) {
        recommendationReason = 'Vicinissimo a te';
      } else if (timeScore >= 90) {
        recommendationReason = 'Aperto per molto tempo';
      } else {
        recommendationReason = 'Miglior rapporto qualità-distanza';
      }

      return {
        ...store,
        scores: {
          priceScore: Math.round(priceScore),
          distanceScore: Math.round(distanceScore),
          timeScore: Math.round(timeScore),
          totalScore: Math.round(totalScore)
        },
        recommendationReason
      };
    });

    return storesWithScores.sort((a, b) => b.scores.totalScore - a.scores.totalScore);
  }, [stores]);
};