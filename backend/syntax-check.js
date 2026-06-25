const fs = require('fs');
const path = require('path');

const checkDir = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkDir(fullPath);
    } else if (fullPath.endsWith('.js')) {
      try {
        require(fullPath);
      } catch (err) {
        if (err.name === 'SyntaxError' || err.message.includes('Cannot find module')) {
          console.error(`Error in ${fullPath}:`, err);
        }
      }
    }
  }
};

checkDir(path.join(__dirname, 'controllers'));
checkDir(path.join(__dirname, 'models'));
checkDir(path.join(__dirname, 'routes'));
checkDir(path.join(__dirname, 'utils'));
checkDir(path.join(__dirname, 'middlewares'));

console.log('Syntax check complete.');
