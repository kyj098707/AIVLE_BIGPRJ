import React from 'react'
import GroupDetail from '../../components/group/GroupDetail'
import Group from '../../components/group/Group'
import { Routes, Route } from 'react-router-dom';
export default function GroupPage() {
  return (
    <Routes>
        <Route path='/' element={<Group></Group>}></Route> 
        <Route path='/:id' element={<GroupDetail></GroupDetail>}></Route>        
      </Routes>

  )
}

