import { useEffect, useRef } from 'react';

/**
 * Custom React hook for loading a script dynamically.
 *
 * @param {Object} options - Options for the script element.
 * @param {string} [options.src=''] - The source URL of the script.
 * @param {boolean} [options.defer=false] - Whether the script should be deferred.
 * @param {boolean} [options.async=false] - Whether the script should be loaded asynchronously.
 * @param {number} [options.delay=0] - Delay in milliseconds before appending the script.
 * @param {Function} [options.onLoad] - Callback function to execute when the script loads successfully.
 * @param {Function} [options.onError] - Callback function to execute if the script fails to load.
 * @param {Object} [options.attributes={}] - Additional attributes to set on the script element.
 *                                          These will be added as custom attributes to the script tag.
 * @returns {void}
 *
 * @example
 * useScript({
 *   src: 'https://example.com/script.js',
 *   defer: true,
 *   async: false,
 *   delay: 1000,
 *   onLoad: () => console.log('Script loaded'),
 *   onError: (error) => console.error('Script failed to load:', error),
 *   'data-custom': 'value' // This will be added as a custom attribute
 * });
 */
const useScript = ({
  src,
  defer = false,
  async = false,
  delay = 0,
  onLoad,
  onError,
  ...attributes
}) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!src) {
      return undefined;
    }

    if (src && document.querySelector(`script[src="${src}"]`)) {
      if (onLoad) {
        onLoad();
      }
      return undefined;
    }

    const appendScript = () => {
      const script = document.createElement('script');

      if (src) {
        script.src = src;
        script.type = 'text/javascript';
      }
      if (defer) script.defer = true;
      if (async) script.async = true;
      if (onLoad) script.onload = onLoad;
      if (onError) script.onerror = onError;

      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value.toString());
      });

      document.head.appendChild(script);
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        appendScript();
      }, delay);
    } else {
      appendScript();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [src, defer, async, delay, onLoad, onError, ...Object.values(attributes)]);
};

export default useScript;
