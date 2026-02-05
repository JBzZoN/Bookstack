import React from 'react';
import defaultEmptyImage from '../../../assets/images/member/empty-state.png';

const EmptyState = ({
    message = "No books found",
    image = defaultEmptyImage,
    icon = null,
    action = null
}) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-5 text-center w-100">
            {icon ? (
                <div className="mb-4" style={{ fontSize: '4rem', opacity: 0.8 }}>
                    {icon}
                </div>
            ) : (
                <img
                    src={image}
                    alt="Empty State"
                    style={{
                        maxWidth: '300px',
                        width: '100%',
                        opacity: 0.9,
                        marginBottom: '1.5rem'
                    }}
                />
            )}

            <h4 style={{
                background: 'linear-gradient(90deg, #4f0bc5, rgb(236, 94, 117))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                marginBottom: action ? '1rem' : '0'
            }}>
                {message}
            </h4>

            {action && (
                <button
                    className="btn btn-primary mt-3"
                    onClick={action.onClick}
                    style={{
                        background: 'linear-gradient(90deg, #4f0bc5, rgb(236, 94, 117))',
                        border: 'none',
                        padding: '10px 25px',
                        borderRadius: '30px'
                    }}
                >
                    {action.label}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
