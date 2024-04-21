interface ExercisesInfo {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
}

interface ArgsData {
  records: number[]
}

const parseArguments1 = (args: string[]):ArgsData => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length === 2) throw new Error('Training records were not provided');
  const maybeData = args.slice(1);
  let validArgs = true;
    for (const arg in maybeData) {
      validArgs = validArgs && !isNaN(Number(arg))
    } 
  if (validArgs) {
    return {
      records: maybeData.map( d => Number(d)) 
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
} 

const calculateExercises = 
  (daily_hours: number[], target: number) : ExercisesInfo => {
    const sum = daily_hours.reduce((a,b) => a + b, 0);
    const average = sum/daily_hours.length || 0;
    const training_days = daily_hours.filter(item => item != 0);
    const rating = () => {
    if (average >= target && (average - target) / target > 0.5) 
      {return 3} 
      else if ((average <= target && (target - average) / target < 0.5)) 
      {return 2} 
      else {return 1}
    };
    const success = () => { if (rating() == 1) {return false} else {return true }};
    const ratingDescription = () => {
      if ( rating() == 1 ) {return `not many training hours`} 
      else if (rating() == 2) {return `good`} 
      else {return `very good`}
    }

    return {
      periodLength: daily_hours.length,
      trainingDays: training_days.length,
      target: target, 
      average: average, 
      rating: rating(),
      success: success(), 
      ratingDescription: ratingDescription()
    }
  } 

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2));


