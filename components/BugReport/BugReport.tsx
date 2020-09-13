import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { BugReportRounded as BugIcon } from '@material-ui/icons';

import ModalType from '@components/BugReport/ModalType';
import ModalForm from '@components/BugReport/ModalForm';

const BugReport = () => {
   const [openType, setOpenType] = useState(false);
   const [openForm, setOpenForm] = useState(false);
   const [type, setType] = useState('');

   const handleClickOpen = () => {
      setOpenType(true);
   };

   const handleCloseType = () => {
      setOpenType(false);
   };

   const handleCloseForm = () => {
      setOpenForm(false);
   };

   const setSelectedType = (type: string) => {
      setType(type);
      setOpenType(false);
      setOpenForm(true);
   };

   return (
      <>
         <IconButton color="inherit" onClick={handleClickOpen}>
            <BugIcon />
         </IconButton>
         <ModalType open={openType} onClose={handleCloseType} setValue={setSelectedType} />
         <ModalForm open={openForm} onClose={handleCloseForm} type={type} />
      </>
   );
};

export default BugReport;
