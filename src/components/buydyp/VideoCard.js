import React from 'react'

const VideoCard = ({title, onSelect}) => {
  return (
    <div className="video-card p-2"  >
    <div className="video-card-image-wrapper">
        <img src={require(`./assets/dummyVideo.png`).default} alt="" />
    </div>
    <div className="d-flex flex-column gap-2 mt-2">
        <span className="video-card-title">{title}</span>
        <div className="d-flex align-items-center gap-2">
            <img src={require('./assets/clockIcon.svg').default} alt="" className="" />
            <span className="video-card-time">12:34</span>
        </div>
    </div>
</div>
  )
}

export default VideoCard