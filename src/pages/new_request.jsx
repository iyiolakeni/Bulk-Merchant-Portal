import React from 'react';
import NewForm from '../component/new_form';
import SideBar from '../component/sidebar';
import Navbar from '../component/navbar';

const NewRequest = ()=>{
    return(
        <div className='dashboard'>
            <SideBar/>
            <div className='content'>
            <Navbar/>
            <NewForm/>
            </div>
        </div>
    )
}
export default NewRequest;