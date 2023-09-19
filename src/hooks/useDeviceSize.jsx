import { useState, useEffect } from 'react';

const useDeviceSize = () => {
  const [mobileDevice, setMobileDevice] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleChangeScreenSize = e => {
      const windowWidth = e.currentTarget.innerWidth;

      if (windowWidth < 768 && !mobileDevice) {
        setMobileDevice(true);
      } else if (windowWidth >= 768 && mobileDevice) {
        setMobileDevice(false);
      }
    }

    window.addEventListener('resize', handleChangeScreenSize);

    return () => window.removeEventListener('resize', handleChangeScreenSize);
  }, [mobileDevice]);

  return mobileDevice;
}

export default useDeviceSize;