import React from 'react';
import { Link } from "react-router-dom";

const CustomLinkTag = ({ route, linkName }) => {
    return (
        <Link style={{ textDecoration: 'none', color: '#333', fontWeight: 500, marginInline: '10px' }} to={route}>
            <p>{linkName}</p>
        </Link>
    );
};

export default CustomLinkTag;