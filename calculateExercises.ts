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
  target: number;
  records: number[];
}

const parseArguments1 = (args: string[]):ArgsData => {
  if (args.length < 3) throw new Error('Not enough arguments');
  if (args.length === 3) throw new Error('Training records were not provided');
  const maybeData = args.slice(2);
  let validArgs = true;
    for (const arg in maybeData) {
      validArgs = validArgs && !isNaN(Number(arg))
    } 
  if (validArgs) {
    const data = maybeData.map( d => Number(d));
    return {
      target: data[0],
      records: data.slice(1)
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
    const success = () => { if (rating() == 1 || 2) {return false} else {return true }};
    const ratingDescription = () => {
      if ( rating() == 2) {return `not too bad but could be better`} 
      else if (rating() == 1) {return `better then nothing`} 
      else {return `good`}
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

  try {
    const {target, records} = parseArguments1(process.argv);
    console.log(calculateExercises(records, target));
  } catch(error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error ' + error.message;
    }
    console.log(errorMessage);
  }



