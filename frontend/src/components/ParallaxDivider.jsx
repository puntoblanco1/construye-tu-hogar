import React from 'react';

const parallaxImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80',
];

const ParallaxDivider = ({ index = 0, children }) => {
  const img = parallaxImages[index % parallaxImages.length];

  return (
    <section
      data-testid={`parallax-divider-${index}`}
      className="parallax-section relative h-[300px] md:h-[400px] overflow-hidden flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${img})` }}
      />
      <div className="absolute inset-0 bg-[#0a1628]/70" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default ParallaxDivider;
