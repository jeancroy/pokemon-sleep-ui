import nextJest from 'next/jest';


const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

export default createJestConfig({});
