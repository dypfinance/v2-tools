import React, { useState } from 'react'
import earnIcon from '../../assets/sidebarIcons/earnIcon.svg'
import earnIconActive from '../../assets/sidebarIcons/earnIconActive.svg'
import governanceIcon from '../../assets/sidebarIcons/governanceIcon.svg'
import governanceIconActive from '../../assets/sidebarIcons/governanceIconActive.svg'
import bridgeIcon from '../../assets/sidebarIcons/bridgeIcon.svg'
import bridgeIconActive from '../../assets/sidebarIcons/bridgeIconActive.svg'
import explorerIcon from '../../assets/sidebarIcons/explorerIcon.svg'
import explorerIconActive from '../../assets/sidebarIcons/explorerIconActive.svg'
import projectsIcon from '../../assets/sidebarIcons/projectsIcon.svg'
import projectsIconActive from '../../assets/sidebarIcons/projectsIconActive.svg'
import swapIcon from '../../assets/sidebarIcons/swapIcon.svg'
import swapIconActive from '../../assets/sidebarIcons/swapIconActive.svg'
import newsIcon from '../../assets/sidebarIcons/newsIcon.svg'
import newsIconActive from '../../assets/sidebarIcons/newsIconActive.svg'
import moreIcon from '../../assets/sidebarIcons/moreIcon.svg'
import moreIconActive from '../../assets/sidebarIcons/moreIconActive.svg'
import { NavLink } from 'react-router-dom'

const MobileMenu = () => {

    const [activeIcon, setActiveIcon] = useState('earn')
    const [explorerModal, setExplorerModal] = useState(true)
    const [moreModal, setMoreModal] = useState(false)



  return (
    <div className="container-fluid mobile-sidebar justify-content-center align-items-center d-flex d-lg-none">
        <div className="row w-100">
            <NavLink to="/earn" className="col" onClick={() => setActiveIcon('earn')}>
                <div className={`d-flex align-items-center sidebar-item ${activeIcon === 'earn' && 'active-side-link'} p-2 justify-content-center`}>
                    <img src={activeIcon === 'earn' ? earnIconActive : earnIcon} width={25} height={25} alt="" />
                    {/* <h3 className={`active-text ${activeIcon === 'earn' ? 'd-flex' : 'd-none'}`}>Earn</h3> */}
                </div>
            </NavLink>
            <NavLink to="/governance" className="col" onClick={() => setActiveIcon('governance')}>
                <div className={`d-flex align-items-center sidebar-item ${activeIcon === 'governance' && 'active-side-link'} p-2 justify-content-center`}>
                    <img src={activeIcon === 'governance' ? governanceIconActive : governanceIcon} width={25} height={25} alt="" />
                    {/* <h3 className={`active-text ${activeIcon === 'governance' ? 'd-flex' : 'd-none'}`}>Governance</h3> */}
                </div>
            </NavLink>
            <NavLink to="/bridge" className="col" onClick={() => setActiveIcon('bridge')}>
                <div className={`d-flex align-items-center sidebar-item ${activeIcon === 'bridge' && 'active-side-link'} p-2 justify-content-center`}>
                    <img src={activeIcon === 'bridge' ? bridgeIconActive : bridgeIcon} width={25} height={25} alt="" />
                    {/* <h3 className={`active-text ${activeIcon === 'bridge' ? 'd-flex' : 'd-none'}`}>Bridge</h3> */}
                </div>
            </NavLink>
            <div className="col" onClick={() => setActiveIcon('explorer')}>
                <div className={`d-flex align-items-center sidebar-item ${activeIcon === 'explorer' && 'active-side-link'} p-2 justify-content-center`}>
                    <img src={activeIcon === 'explorer' ? explorerIconActive : explorerIcon} width={25} height={25} alt="" />
                    {/* <h3 className={`active-text ${activeIcon === 'explorer' ? 'd-flex' : 'd-none'}`}>Explorer</h3> */}
                </div>
            </div>
            <div className="col" onClick={() => setActiveIcon('more')}>
                <div className={`d-flex align-items-center sidebar-item ${activeIcon === 'more' && 'active-side-link'} p-2 justify-content-center`}>
                    <img src={activeIcon === 'more' ? moreIconActive : moreIcon} width={25} height={25} alt="" />
                    {/* <h3 className={`active-text ${activeIcon === 'more' ? 'd-flex' : 'd-none'}`}>More</h3> */}
                </div>
            </div>
        </div>
            <div className="explorer-modal">
                
            </div>
    </div>
  )
}

export default MobileMenu