export const theme = {
  colors: {
    primary: {
      300: '#7AB8FF',
      400: '#5AA5FF',
      500: '#3B92FF',
      600: '#1B7FFF',
      700: '#0A6AE0',
    },
    secondary: {
      300: '#72D9E7',
      400: '#4CCCE0',
      500: '#25BFD9',
      600: '#1AA9C2',
      700: '#1390A6',
    },
    accent: {
      300: '#FFD166',
      400: '#FFC233',
      500: '#FFB300',
      600: '#E09C00',
      700: '#C08400',
    },
    success: {
      300: '#6DD58C',
      400: '#4BCA72',
      500: '#29B058',
      600: '#1D954A',
      700: '#16793C',
    },
    warning: {
      300: '#FFB347',
      400: '#FFA01F',
      500: '#F28C00',
      600: '#D67A00',
      700: '#B96800',
    },
    error: {
      300: '#FF7D7D',
      400: '#FF5C5C',
      500: '#FF3B3B',
      600: '#FF1A1A',
      700: '#E60000',
    },
    neutral: {
      100: '#FFFFFF',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    round: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  gradients: {
    clear: {
      day: ['#4DA0FF', '#2E78D5'],
      night: ['#172941', '#0E1C2B']
    },
    partlyCloudy: {
      day: ['#7ABBFF', '#5A95D5'],
      night: ['#2B3F58', '#1E2B3D']
    },
    cloudy: {
      day: ['#8D9EAE', '#6F7C8A'],
      night: ['#363E47', '#242A31']
    },
    rain: {
      day: ['#545F6B', '#3E4752'],
      night: ['#2E3640', '#1F242B']
    },
    thunderstorm: {
      day: ['#46505D', '#323944'],
      night: ['#26292E', '#1A1C21']
    },
    snow: {
      day: ['#99B0C2', '#7A8C9C'],
      night: ['#394552', '#293039']
    },
    mist: {
      day: ['#8A97A3', '#6E7883'],
      night: ['#374049', '#252B31']
    }
  }
};