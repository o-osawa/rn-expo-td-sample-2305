import React, { useState, useEffect } from 'react'
import { StyleSheet,View, ScrollView } from 'react-native';

import { Title, Text } from 'react-native-paper';
import useInterval from '../hooks/useInterval';

// スクリーン
export default function ClockScreen({ navigation }) {
  const [date, setDate] = useState(new Date());

  //時間更新アニメーション
  useInterval(() => {
    setDate(new Date());
  },
    200);

  //時間取得
  let hours = date.getHours(); // 0~23
  let minutes = date.getMinutes(); // 0~59
  let seconds = date.getSeconds(); // 0~59

  // let meridiem = hours < 12 ? "AM":"PM"
  //  if(hours >= 12 ) hours -= 12
  // let milliseconds = date.getMilliseconds(); // 0~999

  //桁数を2桁0埋めに調整
  // hours = ("00" + hours.toString()).slice(-2)
  // minutes = ("00" + minutes.toString()).slice(-2)
  // seconds = ("00" + seconds.toString()).slice(-2)
  // milliseconds = ("000"+milliseconds.toString()).slice(-3)

  //年月日の取得
  // let year = date.getFullYear()
  // let month = date.getMonth() + 1
  // let day = date.getDay()
  // month = ("00" + month.toString()).slice(-2)
  // day = ("00" + day.toString()).slice(-2)

  // 画面構成
  return (
    <ScrollView style={styles.container}>
      <View style={{ }}>
        <Title>時間を表示しよう</Title>
      </View>
      <View style={{ marginTop: 20 }}>
        {/* <Text style={{ fontSize: 40 }}>{year}/{month}/{day}</Text>*/}
        <Text style={{ fontSize: 60 }}>{hours}:{minutes}:{seconds}</Text>
      </View>

      <View style={{ marginTop: 40, borderTopWidth: 1, borderTopColor: "#999" }} />
      <View style={{ marginTop: 20 }}>
        <Title>プログラムチャレンジ</Title>
        <Text>・年月日を表示しよう</Text>
        <Text>・0で埋めて２桁にしよう</Text>
        <Text>・AM/PM表示にしよう</Text>
      </View>
    </ScrollView>
  );
}

//　スクリーン設定やスタイルなど
export const ClockScreenSetting = {
  title: "時計",
  screenName: "watch"
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
});
