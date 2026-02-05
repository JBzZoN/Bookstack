import React from 'react'
import './title.css'

/**
 * Title Component
 * ==========================================================================
 * Reusable header component for staff-side pages.
 * 
 * Functionality:
 * - Visual Anchor: Displays a consistently styled gradient banner for page titles.
 * - Dynamic Content: Accepts a 'string' prop to define the heading text.
 * - Presentation: Centers the title within a styled wrapper for layout uniformity.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.string - The text to display as the page title.
 * @returns {JSX.Element} The styled heading banner.
 */
function Title({ string }) {
  return (
    <div className="title-wrapper">
      <h1 className="page-title">{string}</h1>
    </div>
  )
}

export default Title
