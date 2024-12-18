
import React, { useState, useEffect, useCallback } from "react";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectPage2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const projectImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  ];

  const changeSlide = useCallback(
    (index) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500); // Reset animation state after transition
    },
    [isAnimating]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % projectImages.length;
      changeSlide(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, changeSlide, projectImages.length]);

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % projectImages.length;
    changeSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      currentSlide === 0 ? projectImages.length - 1 : currentSlide - 1;
    changeSlide(prevIndex);
  };

  const goToSlide = (index) => {
    changeSlide(index);
  };

  return (
    <div className="project-container">
      <div className="project-header">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
          alt="Project Main"
          className="project-main-image"
        />
        <div className="project-info">
          <h1 className="project-title">Cancer Cell Segmentation</h1>
          <p className="project-description">
           <font color='#FFFFFF'>
           This project leverages machine learning, specifically the FML model with VGG architecture, for efficient cancer cell detection and segmentation in medical images. 
           Unlike traditional methods, which are manual and error-prone, our approach offers improved accuracy and efficiency. 
           We showcase results from experiments on benchmark datasets, focusing on model architecture, hyperparameter tuning, and performance evaluation, aiming to enhance cancer diagnosis and treatment.</font>
          </p>
          <div className="project-links">
            <a
              href="https://github.com/Intelli-Stream/Cancer-Cell-Segmentation"
              className="project-link"
            >
              <Github size={20} />
              View Source
            </a>
            <a href="https://intelli-stream.github.io/Cancer-Cell-Segmentation/
" className="project-link">
              <ExternalLink size={20} />
              Live Demo
            </a>
          </div>
        </div>
      </div>

      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {projectImages.map((image, index) => (
            <div
              key={index}
              className={`slide ${currentSlide === index ? "active" : ""}`}
            >
              <img
                src={image}
                alt={`Project ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"} // Lazy loading for subsequent images
              />
            </div>
          ))}
        </div>

        <button
          className="slider-button prev-button"
          onClick={prevSlide}
          disabled={isAnimating}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="slider-button next-button"
          onClick={nextSlide}
          disabled={isAnimating}
        >
          <ChevronRight size={24} />
        </button>

        <div className="slider-nav">
          {projectImages.map((_, index) => (
            <div
              key={index}
              className={`slider-dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage2;