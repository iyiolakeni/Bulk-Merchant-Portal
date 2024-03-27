import React from 'react';
import New_Form from '../component/new_form';
import SideBar from '../component/sidebar';
import Navbar from '../component/navbar';

const New_Request = ()=>{
    return(
        <div className='dashboard'>
            <SideBar/>
            <div className='content'>
            <Navbar/>
            <New_Form/>
            </div>
        </div>
    )
}
export default New_Request;