import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const Breadcrumbs = ({ paths }) => {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-[#375344] transition-colors flex items-center">
        <FiHome className="mr-1" /> Home
      </Link>
      
      {paths.map((path, index) => (
        <div key={index} className="flex items-center">
          <FiChevronRight className="mx-2" />
          {index === paths.length - 1 ? (
            <span className="text-gray-800 font-medium">{path.name}</span>
          ) : (
            <Link to={path.url} className="hover:text-[#375344] transition-colors">
              {path.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
