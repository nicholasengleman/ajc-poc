import React, { useState, useEffect } from 'react';

const ViewRecipe = () => {
  const [isPaywalled, setIsPaywalled] = useState('');
  const [userState, setUserState] = useState('notAuthenticated');
  const [disableRecipeLink, setDisableRecipeLink] = useState(true);

  const handleViewRecipeMetrics = () => {
    const recipeLinkMetricsEvent = new CustomEvent('recipeLink');
    document.dispatchEvent(recipeLinkMetricsEvent);
  };

  useEffect(() => {
    window.addEventListener('paywalled', (e) => {
      e.preventDefault();
      setIsPaywalled(true);
    });
    window.addEventListener('userIsSubscriber', () =>
      setUserState('authenticated'),
    );
    window.addEventListener('userIsSubscriber', () =>
      setUserState('authenticated'),
    );

    return () => {
      window.removeEventListener('paywalled', (e) => {
        e.preventDefault();
        setIsPaywalled(true);
      });
      window.removeEventListener('userIsSubscriber', () =>
        setUserState('authenticated'),
      );
      window.removeEventListener('userIsSubscriber', () =>
        setUserState('authenticated'),
      );
    };
  }, []);

  useEffect(() => {
    if (
      document.body.classList.contains(
        'user-is-logged-out' || 'user-is-registered',
      )
    ) {
      setUserState('notAuthenticated');
    } else if (document.body.classList.contains('user-is-authenticated')) {
      setUserState('authenticated');
    }

    if (userState === 'authenticated' && isPaywalled) {
      setDisableRecipeLink(false);
    } else if (!userState === 'authenticated' && isPaywalled) {
      setDisableRecipeLink(true);
    }
  }, [userState, isPaywalled]);

  if (disableRecipeLink) return null;

  return (
    <>
      {!disableRecipeLink && (
        <div onClick={handleViewRecipeMetrics} className='viewRecipe '>
          <a>View Recipe</a>
        </div>
      )}
    </>
  );
};

export default ViewRecipe;
