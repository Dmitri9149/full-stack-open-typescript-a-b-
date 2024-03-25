const calculateBmi = (height: number, weight: number): string  => {
  const index: number = weight / (height + height);
  if (index <= 18.5) { return `Underweight`} 
  else if (index > 18.5 && index <= 24.9) {return `Normal (healthy weight)`} 
  else { return `Overweight`};
} 

console.log(calculateBmi(180, 74))
