const calculateBmi = (height: number, weight: number): string  => {
  const height_m = height * 0.01;
  const index: number = weight / (height_m * height_m);
  if (index < 18.5) { return `Underweight`} 
  else if (index >= 18.5 && index <= 24.9) {return `Normal (healthy weight)`} 
  else if (index > 24.9 && index <= 29.9) { return `Overweight`} 
  else { return `Obesity` };
} 

console.log(calculateBmi(180, 74))
