import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { Title, Text, Button } from 'react-native-paper';

// スクリーン
export default function DiceScreen({ navigation }) {
  //さいころの目の変数
  const [dice, setDice] = useState(0);
  //さいころの目の記録の変数
  const [diceRecode, setDiceRecode] = useState([]);
  //さいころの表示テキスト
  const diceText = ['', '①', '②', '③', '④', '⑤', '⑥'];

  //サイコロをふる
  const playDice = () => {
    const dice = Math.floor(Math.random() * (diceText.length - 1)) + 1;
    setDice(dice);
    setDiceRecode([diceText[dice], ...diceRecode]);
  };

  // 画面構成
  return (
    <ScrollView style={styles.container}>
      <View>
        <Title>ランダムでさいころを引こう</Title>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>どの目が出るかな？</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button mode="contained" onPress={() => playDice()}>
          サイコロを振る
        </Button>
      </View>
      <View style={{ marginTop: 0, alignItems: 'center' }}>
        <Text style={{ fontSize: 100 }}>{diceText[dice]}</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Title>記録</Title>
        <Text>{diceRecode.join(',')}</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          mode="contained"
          onPress={() => {
            setDiceRecode([]);
          }}>
          リセット
        </Button>
      </View>

      <View
        style={{ marginTop: 40, borderTopWidth: 1, borderTopColor: '#999' }}
      />
      <View style={{ marginTop: 20 }}>
        <Title>プログラムチャレンジ</Title>
        <Text>・サイコロの目をおみくじに変えよう</Text>
        <Text>腕試し）出てくる確率を変えよう</Text>
      </View>
    </ScrollView>
  );
}

//　スクリーン設定やスタイルなど
export const DiceScreenSetting = {
  title: 'さいころ',
  screenName: 'dice',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});