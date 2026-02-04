import React from 'react';
import expiredImage from '../../../assets/images/member/membership-expired.png';

const MembershipExpired = () => {
    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
            style={{
                zIndex: 2000,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(5px)'
            }}>
            <div className="text-center p-5 rounded-4 shadow-lg" style={{ maxWidth: '600px', width: '90%', background: 'white' }}>
                <img
                    src={expiredImage}
                    alt="Membership Expired"
                    style={{
                        width: '180px',
                        marginBottom: '2rem'
                    }}
                />
                <h1 className="display-5 fw-bold mb-3" style={{
                    background: 'linear-gradient(90deg, #4f0bc5, rgb(236, 94, 117))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Membership Expired
                </h1>
                <p className="lead text-muted mb-4">
                    Your membership has ended. Please renew your plan to continue accessing our exclusive collection of books.
                </p>
                <button className="btn btn-lg text-white px-5 rounded-pill" style={{
                    background: 'linear-gradient(90deg, #4f0bc5, rgb(236, 94, 117))',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(236, 94, 117, 0.3)'
                }}
                    onClick={() => window.location.href = '/membership'}
                >
                    Renew Membership
                </button>
            </div>
        </div>
    );
};

export default MembershipExpired;
