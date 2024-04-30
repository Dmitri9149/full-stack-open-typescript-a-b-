import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './calculateExercises';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query;

  try {
    const heightNumber: number = parseFloat(height as string);
    const weightNumber: number = parseFloat(weight as string);

    if (isNaN(heightNumber) || isNaN(weightNumber) ) {
      throw Error();
    }

    const bmi = calculateBmi(heightNumber, weightNumber);

    return res.json({
      weight: weightNumber,
      height: heightNumber,
      bmi: bmi
    });
  }
    catch(error) {
      return res.status(404).json({
        error: "malformed parameters"
      });
    }
});

app.post('/exercises', (req,res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target} = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: 'some parameters are missing'
    });
  }

  if (isNaN(Number(target)) 
      || !Array.isArray(daily_exercises) 
      || daily_exercises.some(isNaN)) {
    return res.status(400).json({
      error: 'malformed parameters'
    });
  }
  
  if ( daily_exercises.length === 0 ) {
  return res.status(400).json({
    error: 'training records were not provided, add at least value'
  });
}

  const cast_exercises = daily_exercises as number[];
  const cast_target = target as number;

  const result = calculateExercises(cast_exercises, cast_target);

  return res.send({ result });

});

const PORT = 3003;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

