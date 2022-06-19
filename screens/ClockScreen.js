import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { Title, Text } from 'react-native-paper';
import useInterval from '../hooks/useInterval';

import SoundFiles from '../constants/Sounds';

// スクリーン
export default function ClockScreen({ navigation }) {
  const [date, setDate] = useState(new Date());

  //時間更新アニメーション
  useInterval(() => {
    setDate(new Date());
  }, 200);

  //時間取得
  let hours = date.getHours(); // 0~23
  let minutes = date.getMinutes(); // 0~59
  let seconds = date.getSeconds(); // 0~59

  //年月日の取得
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // 画面構成
  return (
    <ScrollView style={[styles.container, { backgroundColor: 'aliceblue' }]}>
      <View style={{}}>
        <Title>時間の表示を作ろう</Title>
      </View>
      <View style={{ marginTop: 20, padding: 10, backgroundColor: 'honeydew' }}>
        <Text style={{ fontSize: 40, color: 'lightsteelblue' }}>
          {year}/{month}/{day}
        </Text>
        <Text style={{ fontSize: 60, color: 'turquoise' }}>
          {hours}:{minutes}:{seconds}
        </Text>
      </View>

      <View
        style={{ marginTop: 40, borderTopWidth: 1, borderTopColor: 'gray' }}
      />
      <View style={{ marginTop: 20 }}>
        <Title>プログラムチャレンジ</Title>
        <Text>・色を変えてみよう</Text>
        <Text>・文字の大きさを変えてみよう</Text>
        <Text>腕試し）0で埋めて２桁にしよう</Text>
        <Text>腕試し）AM/PM表示にしよう</Text>
      </View>
    </ScrollView>
  );
}

//　スクリーン設定やスタイルなど
export const ClockScreenSetting = {
  title: '時計',
  screenName: 'watch',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
