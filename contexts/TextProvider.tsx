import React, { createContext, useState, useEffect, useContext } from 'react';

import { useLang } from '@contexts/LangProvider';

import de from '@locales/de';
import en from '@locales/en';
import es from '@locales/es';
import fr from '@locales/fr';
import ja from '@locales/ja';
import pt from '@locales/pt';
import ru from '@locales/ru';
import zh from '@locales/zh';
import { Locales } from '@locales/index';

const TEXTS = {
   de,
   en,
   es,
   fr,
   ja,
   pt,
   ru,
   zh,
};

interface TextContextInterface {
   texts: Locales;
}

interface TextProviderInterface {
   children: any;
}

export const TextContext = createContext<TextContextInterface>({
   texts: TEXTS['en'],
});

export const useText = () => useContext(TextContext);

export const TextProvider = ({ children }: TextProviderInterface) => {
   const { lang } = useLang();
   const [texts, setTexts] = useState(TEXTS['en']);

   const state: TextContextInterface = {
      texts,
   };

   useEffect(() => {
      setTexts(TEXTS[lang]);
   }, [lang]);

   return <TextContext.Provider value={state}>{children}</TextContext.Provider>;
};
