import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ---------- Story: dữ liệu một đoạn truyện ----------
class Story {
  storyTitle: string;
  choice1: string;
  choice2: string;
  nextStory1: number;
  nextStory2: number;

  constructor(
    storyTitle: string,
    choice1: string,
    choice2: string,
    nextStory1: number,
    nextStory2: number,
  ) {
    this.storyTitle = storyTitle;
    this.choice1 = choice1;
    this.choice2 = choice2;
    this.nextStory1 = nextStory1;
    this.nextStory2 = nextStory2;
  }
}

// ---------- StoryBrain: logic tra cứu câu chuyện (không giữ trạng thái) ----------
class StoryBrain {
  private storyData: Story[] = [
    // 0
    new Story(
      'Xe của bạn bị xẹp lốp trên một con đường vắng. Bạn quyết định đi nhờ xe. Một chiếc xe tải màu gỉ sét dừng lại bên cạnh bạn. Một người đàn ông với đôi mắt vô hồn mở cửa xe và hỏi: "Cần đi nhờ không?"',
      'Đồng ý đi nhờ. Cảm ơn vì sự giúp đỡ!',
      'Khoan đã, tốt hơn là tôi nên hỏi anh ta trước xem anh ta có phải là kẻ giết người không.',
      2,
      1,
    ),
    // 1
    new Story(
      'Anh ta chậm rãi gật đầu, không hề nao núng trước câu hỏi.',
      'Ít nhất anh ta thành thật. Tôi sẽ lên xe.',
      'Khoan đã, tôi biết cách thay lốp xe.',
      2,
      3,
    ),
    // 2
    new Story(
      'Khi xe bắt đầu chạy, người lạ kể về mẹ của anh ta và càng lúc càng tức giận. Anh ta bảo bạn mở ngăn đựng đồ. Bên trong có một con dao dính máu, hai ngón tay bị cắt lìa và một cuộn băng cassette. Anh ta với tay về phía ngăn đồ.',
      'Tôi thích bài hát này! Đưa cuộn băng cho anh ta.',
      'Hoặc anh ta hoặc tôi! Bạn cầm dao đâm anh ta.',
      5,
      4,
    ),
    // 3
    new Story(
      'Cái gì? Thật là một cách chọn hèn nhát! Bạn có biết tai nạn giao thông là một trong những nguyên nhân gây tử vong ngoài ý muốn hàng đầu ở hầu hết các nhóm tuổi trưởng thành không? Kết thúc.',
      'Bắt đầu lại',
      '',
      0,
      0,
    ),
    // 4
    new Story(
      'Khi xe đâm xuyên qua lan can và lao xuống những mỏm đá nhọn bên dưới, bạn tự nhủ rằng đâm một người đang lái chiếc xe mà bạn ngồi trong đó không phải là ý hay. Kết thúc.',
      'Bắt đầu lại',
      '',
      0,
      0,
    ),
    // 5
    new Story(
      'Bạn và kẻ sát nhân cùng hát vang trên xe rồi trở nên thân thiết. Anh ta thả bạn ở thị trấn tiếp theo. Trước khi bạn đi, anh ta hỏi bạn có biết chỗ nào tốt để giấu xác không. Bạn đáp: "Thử ở bến tàu xem." Kết thúc.',
      'Bắt đầu lại',
      '',
      0,
      0,
    ),
  ];

  getStory(storyNumber: number) {
    return this.storyData[storyNumber].storyTitle;
  }

  getChoice1(storyNumber: number) {
    return this.storyData[storyNumber].choice1;
  }

  getChoice2(storyNumber: number) {
    return this.storyData[storyNumber].choice2;
  }

  // Trả về số thứ tự đoạn truyện tiếp theo
  nextStory(storyNumber: number, choiceNumber: 1 | 2) {
    const current = this.storyData[storyNumber];
    return choiceNumber === 1 ? current.nextStory1 : current.nextStory2;
  }

  // Chỉ hiện nút 2 khi đoạn truyện còn lựa chọn thứ hai
  buttonShouldBeVisible(storyNumber: number) {
    return this.storyData[storyNumber].choice2 !== '';
  }
}

const brain = new StoryBrain();

// ---------- Nền sao (thay cho background.png) ----------
type Star = { top: number; left: number; size: number; opacity: number };

// Tạo vị trí sao cố định (không đổi mỗi lần render)
function makeStars(count: number): Star[] {
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: count }, () => ({
    top: rand() * 100,
    left: rand() * 100,
    size: 1 + rand() * 2.5,
    opacity: 0.3 + rand() * 0.7,
  }));
}

const STARS = makeStars(60);

// ---------- Màn hình ----------
export default function Lab07Screen() {
  const [storyNumber, setStoryNumber] = useState(0);

  const choose = (choice: 1 | 2) => {
    setStoryNumber(brain.nextStory(storyNumber, choice));
  };

  return (
    <View style={styles.background}>
      {STARS.map((star, index) => (
        <View
          key={index}
          style={[
            styles.star,
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
              opacity: star.opacity,
            },
          ]}
        />
      ))}

      <SafeAreaView style={styles.safe}>
        <View style={styles.inner}>
          <View style={styles.storyBox}>
            <Text style={styles.storyText}>{brain.getStory(storyNumber)}</Text>
          </View>

          <Pressable
            onPress={() => choose(1)}
            style={({ pressed }) => [
              styles.button,
              styles.choice1,
              pressed && styles.pressed,
            ]}>
            <Text style={styles.buttonText}>{brain.getChoice1(storyNumber)}</Text>
          </Pressable>

          {brain.buttonShouldBeVisible(storyNumber) && (
            <Pressable
              onPress={() => choose(2)}
              style={({ pressed }) => [
                styles.button,
                styles.choice2,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.buttonText}>{brain.getChoice2(storyNumber)}</Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0B1030',
    overflow: 'hidden',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  safe: {
    flex: 1,
  },
  inner: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 16,
    gap: 20,
  },
  storyBox: {
    flex: 12,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  storyText: {
    fontSize: 25,
    color: '#ffffff',
  },
  button: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingHorizontal: 16,
  },
  choice1: {
    backgroundColor: '#F44336',
  },
  choice2: {
    backgroundColor: '#2196F3',
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
});