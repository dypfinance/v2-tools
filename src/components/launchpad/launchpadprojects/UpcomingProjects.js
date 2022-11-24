import React from "react";
import "./launchpadprojects.css";
import Slider from "react-slick";
import ProjectCard from "./ProjectCard";

const UpcomingProjects = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    dotsClass: "button__bar",
  };

  return (
    <div className="upcoming-projects">
      <h6 className="launchpad-hero-title mb-4">Upcoming projects</h6>
      <Slider {...settings}>
        <ProjectCard expired={false} upcoming={false} id={1} />
        <ProjectCard expired={false} upcoming={false} id={1} />
        <ProjectCard expired={false} upcoming={false} id={1} />
        <ProjectCard expired={false} upcoming={false} id={1} />
        <ProjectCard expired={false} upcoming={false} id={1} />
        <ProjectCard expired={false} upcoming={false} id={1} />
        <ProjectCard expired={false} upcoming={false} id={1} />
        <ProjectCard expired={false} upcoming={false} id={1} />
        <ProjectCard expired={false} upcoming={false} id={1} />
        <ProjectCard expired={false} upcoming={false} id={1} />
        <ProjectCard expired={false} upcoming={false} id={1} />
      </Slider>
    </div>
  );
};

export default UpcomingProjects;
