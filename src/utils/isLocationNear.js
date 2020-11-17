function isLocationNear(checkPoint, centerPoint, m) {
  const km = m / 1000;
  const ky = 40000 / 360;
  const kx = Math.cos((Math.PI * centerPoint.latitude) / 180.0) * ky;
  const dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
  const dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;

  return Math.sqrt(dx * dx + dy * dy) <= km;
}

export default isLocationNear;
