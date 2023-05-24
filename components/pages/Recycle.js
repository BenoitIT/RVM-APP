import React from 'react';
import Locations from './locations';
import CanType from './CanType';
import { useSelector } from 'react-redux';
import { showPage } from '../../redux/multisSteps/multiStepFormSlice';
import QrScanner from './QrScanner';

const Recycle = () => {
  const currentPage = useSelector(showPage);
  if(currentPage===1) {
  return (
     <Locations /> 
  );
  }
  else if(currentPage===2){
    return (
        <CanType  /> 
     );
  }else{
    return (
      <QrScanner/>
    );
  }
};

export default Recycle;

