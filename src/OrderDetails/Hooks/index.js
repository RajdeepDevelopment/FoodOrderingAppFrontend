export  const getStatusStyle = (status) => {
    switch (status) {
      case 'Prepraing':
        return {
          width: '30%',
          borderRadius: 16,
          backgroundColor: '#FFFF00',
        };
      case 'Cooking':
        return {
          width: '40%',
          borderRadius: 16,
          backgroundColor: '#a8729a',
        };
      case 'Out for Delivery':
        return {
          width: '60%',
          borderRadius: 16,
          backgroundColor: '#0000FF',
        };
      case 'Delivered':
        return {
          width: '100%',
          borderRadius: 16,
          backgroundColor: '#008000',
        };
      case 'Cancelled':
        return {
          width: '100%',
          borderRadius: 16,
          backgroundColor: '#FF0000',
        };
      case 'On Hold':
        return {
          width: '10%',
          borderRadius: 16,
          backgroundColor: '#A52A2A',
        };
      default:
        return {
          width: '0',
          borderRadius: 16,
          backgroundColor: '#808080',
        };
    }
  };
  
  export function disableInteractions() {
    // Prevent clicks
    document.addEventListener('click', preventClicks, true);
    // Prevent keyboard input
    document.addEventListener('keydown', preventKeyboardInput, true);
}

// Enable user interactions
export function enableInteractions() {
    // Remove click prevention
    document.removeEventListener('click', preventClicks, true);
    // Remove keyboard input prevention
    document.removeEventListener('keydown', preventKeyboardInput, true);
}

// Prevent click events
export function preventClicks(event) {
    event.stopPropagation();
    event.preventDefault();
}

// Prevent keyboard input events
export function preventKeyboardInput(event) {
    event.stopPropagation();
    event.preventDefault();
}