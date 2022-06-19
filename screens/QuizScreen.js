import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Title, Text, Button } from 'react-native-paper';
import { Audio } from 'expo-av';

import SoundFiles from '../constants/Sounds';

// スクリーン
export default function QuizScreen({ navigation }) {
  //　画面に表示する変数
  const [answer, setAnsewer] = useState({
    title: 'どれかな？',
    memo: '正解と思うボタンを押そう！',
  });

  //ボタン押下時サウンド
  const [buttonSound, setButtonSound] = React.useState();
  var playSound = async (soundFile) => {
    if (buttonSound) buttonSound.unloadAsync();
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    setButtonSound(sound);
  };

  // 画面構成
  return (
    <ScrollView style={[styles.container, { backgroundColor: 'whitesmoke' }]}>
      <View>
        <Title>クイズを作ろう</Title>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>では問題です！</Text>
        <Text>ORSOはイタリア語では何と読むでしょう？</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        {/*　ボタン１ ----------------------*/}
        <Button
          mode="contained"
          style={{ marginBottom: 5 }}
          onPress={() => {
            playSound(SoundFiles.badSound1); // badSound1,　badSound2
            setAnsewer({ title: '不正解', memo: 'おしい！いきものです' }); //　判定テキスト
          }}>
          ① シャケ
        </Button>

        {/*　ボタン2 ----------------------*/}
        <Button
          style={{ marginBottom: 5 }}
          mode="contained"
          onPress={() => {
            playSound(SoundFiles.badSound1); // badSound1,　badSound2
            setAnsewer({ title: '不正解', memo: '違いました。残念です！' }); //　判定テキスト
          }}>
          ② 無限
        </Button>

        {/*　ボタン3 ----------------------*/}
        <Button
          mode="contained"
          style={{ marginBottom: 5 }}
          onPress={() => {
            playSound(SoundFiles.successSound1); // successSound1 successSound2 successSound3
            setAnsewer({ title: '正解', memo: 'イタリア語で熊でした！' }); //　判定テキスト
          }}>
          ③ 熊
        </Button>

        {/*　ボタン4 ----------------------*/}
        <Button
          mode="contained"
          style={{ marginBottom: 5 }}
          onPress={() => {
            playSound(SoundFiles.badSound1); // 　badSound1,　badSound2
            setAnsewer({ title: '不正解', memo: '違うよ' }); //　判定テキスト
          }}>
          ④ 発明
        </Button>
      </View>

      {/*　結果表示 ----------------------*/}
      <View style={{ marginTop: 20 }}>
        <Title>{answer.title}</Title>
        <Text>{answer.memo}</Text>
      </View>

      <View
        style={{ marginTop: 40, borderTopWidth: 1, borderTopColor: 'gray' }}
      />
      <View style={{ marginTop: 20 }}>
        <Title>プログラムチャレンジ</Title>
        <Text>・ボタンの音の種類を変えよう</Text>
        <Text>腕試し）問題を変えよう</Text>
        <Text>腕試し）正解を変えよう</Text>
      </View>
    </ScrollView>
  );
}

//　スクリーン設定やスタイルなど
export const QuizuScreenSetting = {
  title: 'クイズ',
  screenName: 'quiz',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
