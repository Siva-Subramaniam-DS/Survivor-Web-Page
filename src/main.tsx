import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

// Security: Block Developer Tools and Inspect Mode
(function() {
  'use strict';
  
  // Block F12 key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // Block right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  // Block text selection
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  // Block drag
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  // Detect and block developer tools
  let devtools = {
    open: false,
    orientation: null
  };

  const threshold = 160;

  setInterval(function() {
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      if (!devtools.open) {
        devtools.open = true;
        console.clear();
        console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
        console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it is a scam and will give them access to your account.', 'color: red; font-size: 16px;');
        // Optionally redirect or close the page
        // window.location.href = 'about:blank';
      }
    } else {
      devtools.open = false;
    }
  }, 500);

  // Block console methods
  const noop: (...args: any[]) => void = () => {};
  const methods = ['log', 'debug', 'info', 'warn', 'error', 'trace', 'dir', 'group', 'groupEnd', 'time', 'timeEnd', 'profile', 'profileEnd'];
  methods.forEach(method => {
    (console as any)[method] = noop;
  });

  // Block eval and Function constructor
  window.eval = noop;
  (window as any).Function = noop;

  // Disable image drag
  document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.draggable = false;
      img.oncontextmenu = function(e) {
        e.preventDefault();
        return false;
      };
    });
  });

  // Block common developer shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S
    if ((e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && ['U', 'S'].includes(e.key))) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // Add warning message
  console.log('%c⚠️ WARNING ⚠️', 'color: red; font-size: 20px; font-weight: bold;');
  console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it is a scam and will give them access to your account.', 'color: red; font-size: 14px;');

})();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
