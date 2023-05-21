import React from 'react'
import Locations from './locations';
import CanType from './CanType';
import { View } from 'react-native/types';
import { useSelector } from 'react-redux';
import { showPage } from '../../redux/MultisSteps/multiStepFormSlice';
 const Recycle = () => {
    const currentPage = useSelector(showPage);
    return (
     <View>
        {
            currentPage == 1 ? <Locations/>: currentPage == 2 ? <CanType/>:null
        }
    </View>
    )
}
export default Recycle;
