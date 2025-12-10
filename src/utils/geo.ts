// src/utils/geo.ts
export function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function distanceMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // metros
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

export function isWithinRadius(lat1: number, lon1: number, lat2: number, lon2: number, radiusMeters: number) {
  const d = distanceMeters(lat1, lon1, lat2, lon2);
  return d <= radiusMeters;
}
