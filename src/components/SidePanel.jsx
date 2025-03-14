import React, { useState } from 'react';

const SidePanel = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        marginBottom: '10px',
        backgroundColor: '#f8f9fa',
        padding: '10px',
      }}
    >
      <button
        className="button is-primary"
        onClick={togglePanel}
        style={{ marginBottom: '10px' }}
      >
        {isOpen ? 'Hide' : 'Show'} {title}
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default SidePanel;
