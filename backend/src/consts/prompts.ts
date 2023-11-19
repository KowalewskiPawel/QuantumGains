const ExampleTrainingFormat = `{
    "fatLevel": 25,
    "trainingProgramList": [
    {
    "day": "Monday",
    "exercises": [
    "Warm-up: 5 minutes of jumping jacks or jogging",
    "Bench press: 3 sets of 8-12 reps",
    "Squats: 3 sets of 8-12 reps",
    "Deadlifts: 3 sets of 8-12 reps",
    "Cool-down: 5 minutes of stretching or foam rolling"
    ]
    },
    {
    "day": "Tuesday",
    "exercises": [
    "Warm-up: 5 minutes of jumping jacks or jogging",
    "Bent-over rows: 3 sets of 8-12 reps",
    "Overhead press: 3 sets of 8-12 reps",
    "Lunges: 3 sets of 8-12 reps (per leg)",
    "Cool-down: 5 minutes of stretching or foam rolling"
    ]
    },
    {
    "day": "Wednesday",
    "exercises": [
    "Warm-up: 5 minutes of jumping jacks or jogging",
    "Pull-ups: 3 sets of 8-12 reps",
    "Barbell curls: 3 sets of 8-12 reps",
    "Tricep pushdowns: 3 sets of 8-12 reps",
    "Cool-down: 5 minutes of stretching or foam rolling"
    ]
    },
    {
    "day": "Thursday",
    "exercises": [
    "Warm-up: 5 minutes of jumping jacks or jogging",
    "Dips: 3 sets of 8-12 reps",
    "Cable rows: 3 sets of 8-12 reps",
    "Leg extensions: 3 sets of 8-12 reps",
    "Cool-down: 5 minutes of stretching or foam rolling"
    ]
    },
    {
    "day": "Friday",
    "exercises": [
    "Warm-up: 5 minutes of jumping jacks or jogging",
    "Shoulder press: 3 sets of 8-12 reps",
    "Bicep curls: 3 sets of 8-12 reps",
    "Crunches: 3 sets of 8-12 reps",
    "Cool-down: 5 minutes of stretching or foam rolling"
    ]
    },
    {
    "day": "Saturday",
    "exercises": [
    "Warm-up: 5 minutes of jumping jacks or jogging",
    "Squats: 3 sets of 8-12 reps",
    "Deadlifts: 3 sets of 8-12 reps",
    "Bench press: 3 sets of 8-12 reps",
    "Cool-down: 5 minutes of stretching or foam rolling"
    ]
    },
    {
    "day": "Sunday",
    "exercises": [
    "Warm-up: 5 minutes of jumping jacks or jogging",
    "Barbell curls: 3 sets of 8-12 reps",
    "Tricep pushdowns: 3 sets of 8-12 reps",
    "Leg extensions: 3 sets of 8-12 reps",
    "Cool-down: 5 minutes of stretching or foam rolling"
    ]
    }
    ],
}`;

const ExampleDietFormat = `{
    "diet": [
    {
    "day": "Monday",
    "meals":
    {
    "breakfast": "3 egg omelette with spinach, tomato, and avocado",
    "snack": "1 apple with 2 tablespoons of almond butter",
    "lunch": "Grilled chicken breast with quinoa and roasted vegetables",
    "eveningSnack": "1 cup of Greek yogurt with berries",
    "dinner": "Grilled salmon with sweet potato and green beans"
    }
    },
    {
    "day": "Tuesday",
    "meals":
    {
    "breakfast": "1 cup of oatmeal with banana and honey",
    "snack": "1 cup of carrot sticks with hummus",
    "lunch": "Turkey burger with sweet potato wedges and side salad",
    "eveningSnack": "1 cup of cottage cheese with berries",
    "dinner": "Grilled chicken with brown rice and roasted vegetables"
    }
    },
    {
    "day": "Wednesday",
    "meals":
    {
    "breakfast": "3 egg omelette with spinach, tomato, and avocado",
    "snack": "1 apple with 2 tablespoons of almond butter",
    "lunch": "Grilled chicken breast with quinoa and roasted vegetables",
    "eveningSnack": "1 cup of Greek yogurt with berries",
    "dinner": "Grilled salmon with sweet potato and green beans"
    }
    },
    {
    "day": "Thursday",
    "meals":
    {
    "breakfast": "1 cup of oatmeal with banana and honey",
    "snack": "1 cup of carrot sticks with hummus",
    "lunch": "Turkey burger with sweet potato wedges and side salad",
    "eveningSnack": "1 cup of cottage cheese with berries",
    "dinner": "Grilled chicken with brown rice and roasted vegetables"
    }
    },
    {
    "day": "Friday",
    "meals":
    {
    "breakfast": "3 egg omelette with spinach, tomato, and avocado",
    "snack": "1 apple with 2 tablespoons of almond butter",
    "lunch": "Grilled chicken breast with quinoa and roasted vegetables",
    "eveningSnack": "1 cup of Greek yogurt with berries",
    "dinner": "Grilled salmon with sweet potato and green beans"
    }
    },
    {
    "day": "Saturday",
    "meals":
    {
    "breakfast": "1 cup of oatmeal with banana and honey",
    "snack": "1 cup of carrot sticks with hummus",
    "lunch": "Turkey burger with sweet potato wedges and side salad",
    "eveningSnack": "1 cup of cottage cheese with berries",
    "dinner": "Grilled chicken with brown rice and roasted vegetables"
    }
    },
    {
    "day": "Sunday",
    "meals":
    {
    "breakfast": "3 egg omelette with spinach, tomato, and avocado",
    "snack": "1 apple with 2 tablespoons of almond butter",
    "lunch": "Grilled chicken breast with quinoa and roasted vegetables",
    "eveningSnack": "1 cup of Greek yogurt with berries",
    "dinner": "Grilled salmon with sweet potato and green beans"
    }
    }
    ]
}`;

const errorCheck = `
If the picture doesn't contain a person showing muscles and the body, return an error message in a following format:
{"Error": "The photo doesn't contain a person."}
Otherwise, `;

export const getEstimateBodyFatAndTrainings = (isErrorCheckEnabled = false) => `
Please follow strictly the requirements below, and always output the results in the JSON format.
${isErrorCheckEnabled ? errorCheck : ""}
Estimate the body fat level of this person.
Express the fat level in number as a percentage.
Suggest a training program for a week, with a day of the week and a list of exercises.
Return the response in the following JSON format:
{
fatLevel: number,
trainingProgramList: [{ string: [string] }],
}
For example:
${ExampleTrainingFormat}
`;

export const PrepareDiet = `
Please follow strictly the requirements below, and always output the results in the JSON format.
Estimate the body fat level of this person.
Based on the person's body fat, - suggest a diet for a week, with a day of the week and a list of meals.
Return the response in the following JSON format:
{,
diet: [string: [{string: string}]]
}
For example:
${ExampleDietFormat}
`;