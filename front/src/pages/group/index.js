import React from 'react'
import GroupDetail from '../../components/group/GroupDetail'
import GroupProblem from '../../components/group/GroupProblem'
import Group from '../../components/group/Group'
import { Routes, Route } from 'react-router-dom';
export default function GroupPage() {
  return (
    <Routes>
        <Route path='/' element={<Group></Group>}></Route> 
        <Route path='/:id' element={<GroupDetail></GroupDetail>}></Route>
        <Route path='/:id/member' element={<GroupDetail></GroupDetail>}></Route>
        <Route path='/:id/problem' element={<GroupProblem></GroupProblem>}></Route>        

      </Routes>

  )
}

