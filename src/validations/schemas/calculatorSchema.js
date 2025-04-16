import * as Yup from 'yup';

export const calculatorSchema = Yup.object().shape({
  currentWeight: Yup.number()
    .required('Required')
    .integer('Weight must be an integer')
    .min(30, 'Weight must be at least 30 kg')
    .max(300, 'Weight must be at most 300 kg'),
  height: Yup.number()
    .required('Required')
    .integer('Height must be an integer')
    .min(100, 'Height must be at least 100 cm')
    .max(300, 'Height must be at most 300 cm'),
  age: Yup.number()
    .integer('Age must be an integer')
    .required('Required')
    .min(18, 'Minimum age is 18')
    .max(100, 'Teyze sen kilo verme boşver'),
  desiredWeight: Yup.number()
    .required('Required')
    .integer('Desired weight must be an integer')
    .test(
      'is-less-than-weight',
      'Desired weight must be less than current weight',
      function (value) {
        return parseInt(value) < parseInt(this.parent.currentWeight);
      },
    ),
  bloodType: Yup.number().required('Required').min(0).max(4),
});

export const calculatorInitialValues = {
  currentWeight: '',
  height: '',
  age: '',
  desiredWeight: '',
  bloodType: 1,
};
