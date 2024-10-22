import React from 'react';
import '../../assets/css/loader.css';

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader-backdrop">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
