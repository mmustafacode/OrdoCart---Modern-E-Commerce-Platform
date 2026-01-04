import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, text, color = '#f8e825' }) => {
    return (
        <div className="rating flex items-center">
            {[1, 2, 3, 4, 5].map((index) => (
                <span key={index}>
                    {value >= index ? (
                        <Star size={16} fill={color} color={color} />
                    ) : value >= index - 0.5 ? (
                        <StarHalf size={16} fill={color} color={color} />
                    ) : (
                        <Star size={16} color={color} />
                    )}
                </span>
            ))}
            <span className="ml-2 text-sm text-gray-600">{text && text}</span>
        </div>
    );
};

export default Rating;
