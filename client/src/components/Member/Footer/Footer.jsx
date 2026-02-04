import '../Footer/Footer.css'
import React from 'react';

/**
 * Footer Component
 * ==========================================================================
 * A simple global footer for the member area.
 * Displays copyright information and maintains consistent spacing at the bottom of the page.
 * 
 * @returns {JSX.Element} The Footer component.
 */
function Footer() {
    return (
        <div>
            {/* Divider Line */}
            <div className='ds' />
            <footer>
                <p>&copy; 2025 BookStack. All Rights Reserved.</p>
            </footer>
        </div>
    )
}

export default Footer