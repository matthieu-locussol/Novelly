import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';

export type MessageType = {
   content: string;
   type: AlertProps['severity'];
} | null;

interface NotificationProps {
   message: MessageType;
   setMessage: (message: MessageType) => void;
   timeout?: number;
}

const Notification = ({ message, setMessage, timeout = 5000 }: NotificationProps) => (
   <Snackbar open={message?.content !== ''} autoHideDuration={timeout} onClose={() => setMessage(null)}>
      <Alert onClose={() => setMessage(null)} severity={message?.type}>
         {message?.content}
      </Alert>
   </Snackbar>
);

export default Notification;
