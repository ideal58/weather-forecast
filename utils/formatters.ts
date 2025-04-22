export const formatTemperature = (
  temp: number,
  unit: 'celsius' | 'fahrenheit',
  includeSymbol: boolean = true
): string => {
  // Convert to fahrenheit if needed
  const temperature = unit === 'fahrenheit' ? (temp * 9/5) + 32 : temp;
  
  // Round to nearest integer
  const rounded = Math.round(temperature);
  
  // Return with or without symbol
  return includeSymbol
    ? `${rounded}°${unit === 'celsius' ? 'C' : 'F'}`
    : `${rounded}°`;
};

export const formatWindSpeed = (
  speed: number,
  unit: 'kph' | 'mph'
): number => {
  // Convert to mph if needed
  return unit === 'mph' ? Math.round(speed * 0.621371) : Math.round(speed);
};