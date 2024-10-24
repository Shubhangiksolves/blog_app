import React from 'react';

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader-backdrop">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
