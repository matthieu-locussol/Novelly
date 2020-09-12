import React, { createContext, useState, useEffect, useContext } from 'react';

import { useLang } from '@contexts/LangProvider';

import de from '@locales/de.json';
import en from '@locales/en.json';
import es from '@locales/es.json';
import fr from '@locales/fr.json';
import ja from '@locales/ja.json';
import pt from '@locales/pt.json';
import ru from '@locales/ru.json';
import zh from '@locales/zh.json';

const TEXTS = {
   de: de,
   en: en,
   es: es,
   fr: fr,
   ja: ja,
   pt: pt,
   ru: ru,
   zh: zh,
};

interface TextContextInterface {
   texts: any;
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
