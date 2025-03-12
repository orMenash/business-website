
/**
 * Opens the address in a navigation app based on device and installed apps
 * @param address The address to navigate to
 */
export const openInNavigation = (address: string) => {
  const encodedAddress = encodeURIComponent(address);
  
  // Check if device is iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  // Try to open in Waze first (works on both iOS and Android)
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}`;
  
  // iOS specific handling for Apple Maps
  const appleMapsUrl = `maps://?q=${encodedAddress}`;
  
  // Google Maps as fallback
  const googleMapsUrl = `https://maps.google.com/?q=${encodedAddress}`;
  
  // Create a menu with navigation options
  const openNavigationMenu = () => {
    if (confirm('פתח ב-Waze?')) {
      window.open(wazeUrl, '_blank');
    } else if (confirm('פתח ב-Google Maps?')) {
      window.open(googleMapsUrl, '_blank');
    } else if (isIOS && confirm('פתח ב-Apple Maps?')) {
      window.location.href = appleMapsUrl;
    }
  };
  
  openNavigationMenu();
};
