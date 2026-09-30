import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Question = {
  text: string;
  answer: boolean;
};

const QUESTIONS: Question[] = [
  { text: 'Việt Nam có đường biên giới với Campuchia.', answer: true },
  { text: 'Thủ đô của Việt Nam là Thành phố Hồ Chí Minh.', answer: false },
  { text: 'Mặt trời mọc ở hướng Đông.', answer: true },
  { text: 'Nước sôi ở 100°C ở áp suất khí quyển tiêu chuẩn.', answer: true },
  { text: 'Cá voi là một loài cá.', answer: false },
  { text: 'Sông Mê Kông chảy qua Việt Nam.', answer: true },
  { text: 'Một năm dương lịch bình thường có 366 ngày.', answer: false },
];

const RESTART_DELAY_MS = 2000;

export default function Lab06Screen() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [scoreKeeper, setScoreKeeper] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dọn timer khi rời màn hình
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const checkAnswer = (userAnswer: boolean) => {
    if (finished) return;

    const isCorrect = userAnswer === QUESTIONS[questionNumber].answer;
    const newScore = [...scoreKeeper, isCorrect];
    setScoreKeeper(newScore);

    if (questionNumber >= QUESTIONS.length - 1) {
      // Hết câu hỏi: hiện kết quả rồi tự khởi động lại
      setFinished(true);
      timer.current = setTimeout(() => {
        setQuestionNumber(0);
        setScoreKeeper([]);
        setFinished(false);
      }, RESTART_DELAY_MS);
    } else {
      setQuestionNumber(questionNumber + 1);
    }
  };

  const correctCount = scoreKeeper.filter(Boolean).length;
  const questionText = finished
    ? `Hoàn thành!\nBạn trả lời đúng ${correctCount}/${QUESTIONS.length} câu.`
    : QUESTIONS[questionNumber].text;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{questionText}</Text>
        </View>

        <Pressable
          onPress={() => checkAnswer(true)}
          disabled={finished}
          style={({ pressed }) => [
            styles.button,
            styles.trueButton,
            (pressed || finished) && styles.dim,
          ]}>
          <Text style={styles.buttonText}>Đúng</Text>
        </Pressable>

        <Pressable
          onPress={() => checkAnswer(false)}
          disabled={finished}
          style={({ pressed }) => [
            styles.button,
            styles.falseButton,
            (pressed || finished) && styles.dim,
          ]}>
          <Text style={styles.buttonText}>Sai</Text>
        </Pressable>

        <View style={styles.scoreRow}>
          {scoreKeeper.map((isCorrect, index) => (
            <Text
              key={index}
              style={[styles.scoreIcon, { color: isCorrect ? '#4CAF50' : '#F44336' }]}>
              {isCorrect ? '✓' : '✗'}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  inner: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 12,
  },
  questionBox: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  questionText: {
    fontSize: 25,
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  trueButton: {
    backgroundColor: '#4CAF50',
  },
  falseButton: {
    backgroundColor: '#F44336',
  },
  dim: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
  },
  scoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: 32,
    alignItems: 'center',
    gap: 6,
  },
  scoreIcon: {
    fontSize: 24,
    fontWeight: '700',
  },
});