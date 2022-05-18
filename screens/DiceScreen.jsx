import { useState } from 'react'
import { StyleSheet, View } from 'react-native';

import { Title, Text, Button } from 'react-native-paper';

// スクリーン
export default function DiceScreen({ navigation }) {
  //さいころの目の変数
  const [dice, setDice] = useState(0);
  //さいころの目の記録の変数
  const [diceRecode, setDiceRecode] = useState([]);
  //さいころの表示テキスト
  const diceText = ["", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];

  //サイコロをふる
  const playDice = () => {
    const dice = Math.floor(Math.random() * 6) + 1;
    setDice(dice);
    setDiceRecode([diceText[dice], ...diceRecode]);
  }

  // 画面構成
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Title>さいころ🎲</Title>
        <Text>どの目が出るかな？</Text>
        <Button mode="contained" onPress={()=>playDice()}>
          サイコロを振る
        </Button>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 100 }}>{diceText[dice]}</Text>
      </View>

      <View style={{ marginTop: 20,width:"80%" }}>
        <Title>記録</Title>
        <Text>{diceRecode}</Text>

      </View>
      <View style={{ marginTop: 20 }}>
        <Button mode="contained" onPress={()=>{setDiceRecode([])}}>
            リセット
        </Button>
      </View>
    </View>
  );
}

//　スクリーン設定やスタイルなど
export const DiceScreenSetting = {
  title: "さいころ",
  screenName: "dice"
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
