import React from 'react';

type WelcomeProps = {
   children: any;
};

const Welcome = ({ children }: WelcomeProps) => <div className="welcome">{children}</div>;

export default Welcome;
