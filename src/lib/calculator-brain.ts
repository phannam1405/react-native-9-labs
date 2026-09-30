export class CalculatorBrain {
  height: number; // cm
  weight: number; // kg

  constructor(height: number, weight: number) {
    this.height = height;
    this.weight = weight;
  }

  // BMI = weight / (height / 100)^2
  getBMI(): string {
    const bmi = this.weight / Math.pow(this.height / 100, 2);
    return bmi.toFixed(1);
  }

  getResult(): string {
    const bmi = parseFloat(this.getBMI());
    if (bmi >= 25) return 'Overweight';
    if (bmi > 18.5) return 'Normal';
    return 'Underweight';
  }

  getInterpretation(): string {
    const bmi = parseFloat(this.getBMI());
    if (bmi >= 25) return 'Bạn đang thừa cân. Hãy vận động nhiều hơn nhé!';
    if (bmi > 18.5) return 'Chỉ số BMI bình thường. Làm tốt lắm!';
    return 'Bạn hơi thiếu cân. Hãy ăn uống đủ chất hơn nhé.';
  }
}