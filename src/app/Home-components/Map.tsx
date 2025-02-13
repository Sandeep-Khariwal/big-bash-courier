"use client"
import React from 'react';

const Map = () => {
  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe
          className="gmap_iframe"
          frameBorder="0"
          scrolling="no"
          src="https://maps.google.com/maps?width=600&height=400&hl=en&q=sky+king+Shop+6+Gali+Sapra+Wali+New,+Market,+M.C,+Sirsa,+Haryana+125055&t=&z=14&ie=UTF8&iwloc=B&output=embed"
          title="Google Map"
        ></iframe>
        <a href="https://sprunkin.com/" target="_blank" rel="noopener noreferrer">
          Sprunki
        </a>
      </div>
      <style jsx>{`
        .mapouter {
          position: relative;
          text-align: right;
          width: 100%;
          height: 500px;
        }
        .gmap_canvas {
          overflow: hidden;
          background: none !important;
          width: 100%;
          height: 500px;
        }
        .gmap_iframe {
          width: 100% !important;
          height: 500px !important;
        }
      `}</style>
    </div>
  );
};

export default Map;
