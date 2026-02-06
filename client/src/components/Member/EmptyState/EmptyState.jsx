import React from 'react';
import emptyBook from '../../../assets/images/member/empty_state.png'; // Updated Premium Image

/**
 * EmptyState Component
 * ==========================================================================
 * Displays a visual placeholder when a list or section has no content to show.
 * 
 * Features:
 * - Premium Visuals: Uses a 3D minimalist matching the BookCard aesthetic.
 * - Consistent Specs: Fixed height (480px) and width (380px) to prevent layout shifts.
 * - Simplicity: Focuses on image and a single text message without clutter.
 * 
 * @param {Object} props
 * @param {string} [props.message="No books found"] - The text message to display below the image.
 * @param {string} [props.image=emptyBook] - Optional override for the image source.
 * @returns {JSX.Element} The styled empty state component.
 */
const EmptyState = ({
    message = "No books found",
    image = emptyBook,
}) => {
    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center text-center"
            style={{
                width: '100%',
                height: '100%',
                background: '#f8f9fa44', // Subtle background to show occupation
                borderRadius: '0.9rem'
            }}
        >
            <img
                src={image}
                alt="Empty State"
                style={{
                    maxWidth: '100%', // Allow parent to control size
                    width: '100%',
                    opacity: 1,
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                    maxHeight: '600px', // Increased max height
                    objectFit: 'contain'
                }}
            />

            <h5 style={{
                color: '#6b7280', // Simple grey text
                fontWeight: '600',
                margin: 0
            }}>
                {message}
            </h5>
        </div>
    );
};

export default EmptyState;
