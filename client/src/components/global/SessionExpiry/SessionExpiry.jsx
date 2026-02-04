import React from 'react';
import { useNavigate } from 'react-router-dom';
import sessionExpiredImage from '../../../assets/images/session-expired.png';

/**
 * SessionExpiry Component
 * ==========================================================================
 * A reusable full-screen overlay that appears when a user's session (JWT)
 * has expired. Clicking the overlay redirects the user to the login page.
 * 
 * @param {Object} props
 * @param {boolean} props.isVisible - Controls the visibility of the overlay.
 * @returns {JSX.Element|null} React component or null if not visible.
 */
const SessionExpiry = ({ isVisible }) => {
    const navigate = useNavigate();

    /* ==========================================================================
       Lifecycle & Handlers
       ========================================================================== */
    if (!isVisible) return null;

    /**
     * Redirects to login on overlay interaction.
     */
    const handleOverlayClick = () => {
        navigate('/login');
    };

    /* ==========================================================================
       Render
       ========================================================================== */
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
            onClick={handleOverlayClick}
            style={{
                zIndex: 3000, // Ensure it stays on top of all other UI components
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(5px)',
                cursor: 'pointer'
            }}
            title="Session Expired. Click to login again."
        >
            <img
                src={sessionExpiredImage}
                alt="Session Expired"
                className="img-fluid"
                style={{
                    maxWidth: '70%',
                    width: '70%'
                }}
            />
        </div>
    );
};

export default SessionExpiry;
