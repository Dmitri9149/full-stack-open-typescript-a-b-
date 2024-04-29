interface HeightWeight {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]):HeightWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments'); 
  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
}; 

const calculateBmi = (height: number, weight: number): string  => {
  const height_m = height * 0.01;
  
  const index: number = weight / (height_m * height_m);
  if (index < 18.5) { return `Underweight`;} 
  else if (index >= 18.5 && index <= 24.9) {return `Normal (healthy weight)`;} 
  else if (index > 24.9 && index <= 29.9) { return `Overweight`;} 
  else { return `Obesity`; }
};

try {
  const {height, weight} = parseArguments(process.argv);
  console.log(calculateBmi(height,weight));
} catch(error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += 'Error' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;
