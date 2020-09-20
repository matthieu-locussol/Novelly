import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { BugReportRounded as BugIcon } from '@material-ui/icons';

import ModalType from '@components/BugReport/ModalType';
import BugForm from '@components/BugReport/BugForm';
import FeatureForm from '@components/BugReport/FeatureForm';

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
         {/* Step 1: Ask for an action */}
         <ModalType open={openType} onClose={handleCloseType} setValue={setSelectedType} />
         {/* Step 2: Action form */}
         {type === 'bug' && <BugForm open={openForm} onClose={handleCloseForm} />}
         {type === 'feature' && <FeatureForm open={openForm} onClose={handleCloseForm} />}
      </>
   );
};

export default BugReport;
