import { useState, useEffect, useRef } from 'react';
import { Cookie, Preset } from '../utils/types';
import { generateCookieUrl } from '../utils/urlEncoder';
import { TLDS } from '../utils/constants';

export function useUrlGenerator() {
  const [brand, setBrand] = useState('');
  const [tld, setTld] = useState(TLDS[0]);
  const [cookies, setCookies] = useState<Cookie[]>([{ name: '', value: '' }]);
  const [destination, setDestination] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [error, setError] = useState('');
  const isAutoFilledRef = useRef(false);

  // Auto-fill destination when brand or TLD changes
  useEffect(() => {
    if (brand && tld) {
      const autoFilledUrl = `https://www.${brand}.${tld}`;
      // Only auto-fill if destination is empty or was previously auto-filled
      if (!destination || isAutoFilledRef.current) {
        setDestination(autoFilledUrl);
        isAutoFilledRef.current = true;
      }
    } else if (brand && !tld && isAutoFilledRef.current) {
      setDestination('');
      isAutoFilledRef.current = false;
    }
  }, [brand, tld, destination]);

  const addCookie = () => {
    setCookies([...cookies, { name: '', value: '' }]);
  };

  const removeCookie = (index: number) => {
    const newCookies = cookies.filter((_, i) => i !== index);
    setCookies(newCookies.length > 0 ? newCookies : [{ name: '', value: '' }]);
  };

  const updateCookie = (index: number, field: 'name' | 'value', value: string) => {
    const newCookies = [...cookies];
    newCookies[index][field] = value;
    setCookies(newCookies);
  };

  const generateUrl = () => {
    setError('');

    if (!brand) {
      setError('Please select a brand');
      return null;
    }

    const validCookies = cookies.filter(c => c.name.trim() && c.value.trim());

    try {
      const url = generateCookieUrl(brand, tld, validCookies, destination);
      setGeneratedUrl(url);
      return url;
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  const loadPreset = (preset: Preset) => {
    setBrand(preset.brand);
    setTld(preset.tld);
    setCookies(preset.cookies.length > 0 ? preset.cookies : [{ name: '', value: '' }]);
    setDestination(preset.destination || '');
    isAutoFilledRef.current = false; // Preset destination is user-defined
    setGeneratedUrl('');
    setError('');
  };

  const getCurrentConfig = (): Preset => ({
    brand,
    tld,
    cookies: cookies.filter(c => c.name.trim() && c.value.trim()),
    destination: destination || undefined,
  });

  const reset = () => {
    setBrand('');
    setTld(TLDS[0]);
    setCookies([{ name: '', value: '' }]);
    setDestination('');
    isAutoFilledRef.current = false;
    setGeneratedUrl('');
    setError('');
  };

  // Custom setDestination that tracks manual changes
  const handleSetDestination = (value: string) => {
    setDestination(value);
    isAutoFilledRef.current = false; // Mark as manually edited
  };

  return {
    brand,
    setBrand,
    tld,
    setTld,
    cookies,
    addCookie,
    removeCookie,
    updateCookie,
    destination,
    setDestination: handleSetDestination,
    generatedUrl,
    error,
    generateUrl,
    loadPreset,
    getCurrentConfig,
    reset,
  };
}
