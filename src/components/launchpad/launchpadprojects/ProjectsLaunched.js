import React from 'react'
import './launchpadprojects.css'
import Slider from 'react-slick';
import ProjectCard from './ProjectCard';

const ProjectsLaunched = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        dotsClass: "button__bar"
      };

  return (
    <div className='upcoming-projects'>
    <h6 className="launchpad-hero-title mb-4">
        Projects launched
    </h6>
    <Slider {...settings}>
      <ProjectCard expired={true} upcoming={true} />
      <ProjectCard expired={true} upcoming={true} />
      <ProjectCard expired={true} upcoming={true} />
      <ProjectCard expired={true} upcoming={true} />
      <ProjectCard expired={true} upcoming={true} />
      <ProjectCard expired={true} upcoming={true} />
      <ProjectCard expired={true} upcoming={true} />
      <ProjectCard expired={true} upcoming={true} />
      <ProjectCard expired={true} upcoming={true} />
      <ProjectCard expired={true} upcoming={true} />
      <ProjectCard expired={true} upcoming={true} />
    </Slider>
    </div>
  )
}

export default ProjectsLaunched