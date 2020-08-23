import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import TranslateIcon from '@material-ui/icons/Translate';

import { useLang } from '@contexts/LangProvider';

const LANGUAGES: Record<string, string> = {
   en: 'English',
   zh: '中文',
   ru: 'Русский',
   pt: 'Português',
   es: 'Español',
   fr: 'Français',
   de: 'Deutsch',
   ja: '日本語',
};

const LangPicker = () => {
   const { setLang } = useLang();
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const chooseLang = (lang: string) => {
      setLang(lang);
      handleClose();
   };

   return (
      <div className="lang-picker">
         <IconButton aria-controls="lang-picker-menu" aria-haspopup="true" onClick={handleClick}>
            <TranslateIcon />
         </IconButton>
         <Menu
            id="lang-picker-menu"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            {Object.keys(LANGUAGES).map((lang) => (
               <MenuItem onClick={() => chooseLang(lang)}>{LANGUAGES[lang]}</MenuItem>
            ))}
         </Menu>
      </div>
   );
};

export default LangPicker;
