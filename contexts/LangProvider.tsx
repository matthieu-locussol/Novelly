import React, { createContext, useState, useEffect, useContext } from 'react';

type LangType = 'en' | 'zh' | 'ru' | 'pt' | 'es' | 'fr' | 'de' | 'ja';

interface LangContextInterface {
   lang: LangType;
   setLang: Function;
}

interface LangProviderInterface {
   children: any;
}

export const LangContext = createContext<LangContextInterface>({
   lang: 'en',
   setLang: () => {},
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: LangProviderInterface) => {
   const [lang, setLang] = useState<LangType>('en');

   useEffect(() => {
      const userLang = window.localStorage.getItem('lang') as LangType;

      if (userLang) {
         setLang(userLang);
      }
   }, []);

   const state: LangContextInterface = {
      lang,
      setLang,
   };

   return <LangContext.Provider value={state}>{children}</LangContext.Provider>;
};
