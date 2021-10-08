import { useTranslation } from 'react-i18next';

const LanguageSelector = (props) => {
  const { i18n } = useTranslation();

  return (
    <>
      <img
        src="https://www.countryflags.io/tr/flat/24.png"
        title="Türkçe"
        onClick={() => i18n.changeLanguage('tr')}
        alt="Turkish Flag"
      />
      <img
        src="https://www.countryflags.io/gb/flat/24.png"
        title="English"
        onClick={() => i18n.changeLanguage('en')}
        alt="Great Britain Flag"
      />
    </>
  );
};

export default LanguageSelector;
