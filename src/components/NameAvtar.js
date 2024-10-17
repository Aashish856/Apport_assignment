// NameAvatar.js

import React from 'react';

const getInitials = (name) => {
    const nameParts = name.trim().split(' ');
    const initials = nameParts.length > 1 
        ? `${nameParts[0][0]}${nameParts[1][0]}` 
        : nameParts[0][0];
    return initials.toUpperCase();
};

// Define a mapping of initials to colors
const colorMapping = {
    'A': '#FF6347', // Tomato
    'B': '#4682B4', // SteelBlue
    'C': '#008080', // Teal
    'D': '#800080', // Purple
    'E': '#2F4F4F', // DarkSlateGray
    'F': '#556B2F', // DarkOliveGreen
    'G': '#8B4513', // SaddleBrown
    // Add more mappings as needed
    'H': '#FF69B4', // HotPink
    'I': '#FFD700', // Gold
    'J': '#FF4500', // OrangeRed
    'K': '#6A5ACD', // SlateBlue
    'L': '#20B2AA', // LightSeaGreen
    'M': '#FF8C00', // DarkOrange
    'N': '#B22222', // FireBrick
    'O': '#9932CC', // DarkOrchid
    'P': '#FF1493', // DeepPink
    'Q': '#FFD700', // Gold
    'R': '#8B0000', // DarkRed
    'S': '#00BFFF', // DeepSkyBlue
    'T': '#A0522D', // SandyBrown
    'U': '#FF4500', // OrangeRed
    'V': '#8B008B', // DarkMagenta
    'W': '#7FFF00', // Chartreuse
    'X': '#FF00FF', // Magenta
    'Y': '#4682B4', // Khaki
    'Z': '#228B22', // ForestGreen
};

const getColorByInitial = (initial) => {
    return colorMapping[initial] || '#808080'; // Default to gray if initial not found
};

const NameAvatar = ({ name }) => {
    const initials = getInitials(name);
    const bgColor = getColorByInitial(initials[0]); // Get color based on first initial

    return (
        <div 
            style={{
                backgroundColor: bgColor,
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                fontSize: '10px',
                fontWeight: 'bold',
                textTransform: 'uppercase'
            }}
        >
            {initials}
        </div>
    );
};

export default NameAvatar;
