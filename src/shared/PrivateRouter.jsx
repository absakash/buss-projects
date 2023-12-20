import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../contexts/Authcontexts'
const PrivateRouter = ({children}) => {
      const {}=useContext(AuthContext)
       const location=useLocation();
      
      
};

export default PrivateRouter;