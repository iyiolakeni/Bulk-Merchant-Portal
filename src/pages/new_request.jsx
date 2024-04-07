import React from 'react';
import NewForm from '../component/new_form';
import SideBar from '../component/sidebar';
import Navbar from '../component/navbar';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const NewRequest = ()=>{
    const {user} = useContext(UserContext);

    return(
        <div className='dashboard'>
            <SideBar/>
            <div className='content'>
            <Navbar/>
            <NewForm user={user}/>
            </div>
        </div>
    )
}
export default NewRequest;