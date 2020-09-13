import React from 'react';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { TranslateRounded as TranslateIcon } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles(() =>
   createStyles({
      button: {
         color: 'inherit',
      },
      active: {
         fontWeight: 'bold',
      },
   }),
);

const LangPicker = () => {
   const classes = useStyles();
   const { lang, setLang } = useLang();
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const chooseLang = (lang: string) => {
      window.localStorage.setItem('lang', lang);
      setLang(lang);
      handleClose();
   };

   return (
      <>
         <IconButton
            aria-label="language"
            aria-controls="lang-picker-menu"
            aria-haspopup="true"
            className={classes.button}
            onClick={handleClick}>
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
            {Object.keys(LANGUAGES).map((l, key) => (
               <MenuItem className={lang === l ? classes.active : ''} key={key} onClick={() => chooseLang(l)}>
                  {LANGUAGES[l]}
               </MenuItem>
            ))}
         </Menu>
      </>
   );
};

export default LangPicker;
