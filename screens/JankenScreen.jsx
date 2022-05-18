import { useState } from 'react'
import { StyleSheet, View } from 'react-native';

import { Title, Text, Button } from 'react-native-paper';

// スクリーン
export default function JankenScreen({ navigation }) {
  //さいころの目の番号を入れる
  const [playerJanken, setPlayerJanken] = useState(0);
  const [pcJanken, setPcJanken] = useState(0);
  const [result, setResult] = useState("--");
  const [resultRecodes, setResultRecodes] = useState([]);
  const jankenTexts = ["-", "✊", "✌️", "🖐"];

  //じゃんけんボタンが押され、じゃんけん結果の確認
  const playJanken = (player) => {
    //じゃんけんの抽選
    const pc = Math.floor(Math.random() * 3) + 1;
    let resultText = ""
    let resultRecodesText = ""

    //じゃんけんの判定
    if (player === 1) {
      //グーの時に
      if (pc === 2) {
        //チョキ
        resultText = "あなたの勝ち"
        resultRecodesText = "勝"
      } else if (pc === 3) {
        //パー
        resultText = "あなたの負け"
        resultRecodesText = "負"
      } else {
        resultText = "引分け"
        resultRecodesText = "引"
      }
    } else if (player === 2) {
      //チョキの時に
      if (pc === 3) {
        resultText = "あなたの勝ち"
        resultRecodesText = "勝"
      } else if (pc === 1) {
        resultText = "あなたの負け"
        resultRecodesText = "負"
      } else {
        resultText = "引分け"
        resultRecodesText = "引"
      }
    } else if (player === 3) {
      //パーの時に
      if (pc === 1) {
        resultText = "あなたの勝ち"
        resultRecodesText = "勝"
      } else if (pc === 2) {
        resultText = "あなたの負け"
        resultRecodesText = "負"
      } else {
        resultText = "引分け"
        resultRecodesText = "引"
      }
    }
    //表示の設定
    setPcJanken(pc);
    setPlayerJanken(player);
    setResult(resultText);
    setResultRecodes([resultRecodesText, ...resultRecodes])
  }

  // 画面構成
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Title>PCとじゃんけん勝負</Title>
        <Text>どれを出す？</Text>
      </View>
      <View style={{ marginTop: 20, width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
        <Button mode="contained" onPress={() => playJanken(1)}>✊</Button>
        <Button mode="contained" onPress={() => playJanken(2)}>✌️</Button>
        <Button mode="contained" onPress={() => playJanken(3)}>🖐</Button>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 40 }}>あなた：{jankenTexts[playerJanken]}</Text>
        <Text style={{ fontSize: 40 }}>PC:{jankenTexts[pcJanken]}</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Title style={{}}>結果：{result}</Title>
      </View>

      <View style={{ marginTop: 20, width: "80%" }}>
        <Title>記録</Title>
        <Text>{resultRecodes}</Text>

      </View>
      <View style={{ marginTop: 20 }}>
        <Button mode="contained" onPress={() => { setResultRecodes([]) }}>リセット</Button>
      </View>
    </View>
  );
}

//　スクリーン設定やスタイルなど
export const JankenScreenSetting = {
  title: "じゃんけん",
  screenName: "janken"
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
