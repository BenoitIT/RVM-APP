import React from 'react';
import Locations from './locations';
import CanType from './CanType';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { showPage } from '../../redux/multisSteps/multiStepFormSlice';

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
    return null;
  }
};

export default Recycle;

