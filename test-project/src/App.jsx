import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div className="app">
      {/* These keys exist — should NOT produce warnings */}
      <h1>{t('common.greeting')}</h1>
      <p>{t('auth.login')}</p>
      <button>{t('common.save')}</button>

      {/* These keys are MISSING in uk.json — should produce warnings */}
      <p>{t('settings.notifications.email')}</p>
      <p>{t('errors.not_found')}</p>
      <p>{t('errors.network.timeout')}</p>

      {/* This key does NOT exist in ANY locale — should produce error */}
      <p>{t('completely.nonexistent.key')}</p>
    </div>
  );
}

export default App;
