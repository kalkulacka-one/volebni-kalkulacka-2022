// import the necessary modules
import * as process from 'process';

// Function to get the value of an environmental variable or a default value
function getEnvOrDefault(envVariable: string, defaultValue: string): string {
  return process.env[envVariable] || defaultValue;
}

// Function to parse command-line arguments
function parseCommandLineArgs(): { name: string; age: number } {
  const nameArgIndex = process.argv.indexOf('--name');
  const ageArgIndex = process.argv.indexOf('--age');

  const name = nameArgIndex !== -1 ? process.argv[nameArgIndex + 1] : '';
  const age =
    ageArgIndex !== -1 ? parseInt(process.argv[ageArgIndex + 1]) : NaN;

  return { name, age };
}

// Main function
function main() {
  // Parse command-line arguments
  const { name: nameFromArgs, age: ageFromArgs } = parseCommandLineArgs();

  // Get values from environmental variables or set default values
  const nameFromEnv = getEnvOrDefault('NAME', 'Default Name');
  const ageFromEnv = parseInt(getEnvOrDefault('AGE', '0'));

  // Display the values
  console.log('Name from args:', nameFromArgs);
  console.log('Age from args:', ageFromArgs);
  console.log('Name from environmental variable:', nameFromEnv);
  console.log('Age from environmental variable:', ageFromEnv);
}

// Call the main function
main();
