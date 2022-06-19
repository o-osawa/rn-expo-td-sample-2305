import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Title, Text, Button } from 'react-native-paper';
import { Audio } from 'expo-av';

import SoundFiles from '../constants/Sounds';

import useInterval from '../hooks/useInterval';

const sloatReel = [
  ['🍉', '7️⃣'],
  ['🍉', '7️⃣'],
  ['7️⃣', '🍉'],
]; // , '🍌'

// スクリーン
export default function SlotScreen({ navigation }) {
  const [slot, setSlot] = useState([
    Math.floor(Math.random() * sloatReel[0].length),
    Math.floor(Math.random() * sloatReel[1].length),
    Math.floor(Math.random() * sloatReel[2].length),
  ]);
  const [slotMove, setSlotMove] = useState([false, false, false]); //　アニメーション状態
  const [point, setPoint] = useState(60); //　点数
  const [result, setResult] = useState(null); //　判定結果
  const [resultRecodes, setResultRecodes] = useState([]);

  //betボタン処理
  const bet = (betPoint) => {
    setPoint(point - betPoint);
    setSlotMove([true, true, true]);
    setResult(null);
    playSlotMusicSound(SoundFiles.slotMusic1); //　開始音楽
  };

  //stopボタン処理
  const stop = (slotNum) => {
    playSound(SoundFiles.buttonPushSound1); //　ボタンの音
    const newSlotMove = [...slotMove];
    newSlotMove[slotNum] = false;
    setSlotMove(newSlotMove);
    //　２つのスロットが止まって同じ絵柄の時
    // if (
    //   !newSlotMove[0] && !newSlotMove[1] && newSlotMove[2] && sloatReel[0][slot[0]] === sloatReel[1][slot[1]] ||
    //   !newSlotMove[0] && newSlotMove[1] && !newSlotMove[2] && sloatReel[0][slot[0]] === sloatReel[2][slot[2]] ||
    //   newSlotMove[0] && !newSlotMove[1] && !newSlotMove[2]  && sloatReel[1][slot[1]] === sloatReel[2][slot[2]]  ) {
    //     playSlotMusicSound(SoundFiles.slotMusic2);//ドラムロール
    // }
    //全てのスロットが止まったら
    if (!newSlotMove[0] && !newSlotMove[1] && !newSlotMove[2]) {
      slotMusic.unloadAsync(); //音楽停止
      let getPoint = 0;
      //全ての絵柄が同じ
      if (
        sloatReel[0][slot[0]] === sloatReel[1][slot[1]] &&
        sloatReel[0][slot[0]] === sloatReel[2][slot[2]]
      ) {
        getPoint = 15;
        // playSlotMusicSound(SoundFiles.successSound1); //あたりサウンド successSound1, successSound2, successSound3
      }
      setPoint(point + getPoint);
      setResult(getPoint);
      setResultRecodes([getPoint, ...resultRecodes]);
    }
  };

  //リセットボタン処理
  const reset = () => {
    setSlotMove([false, false, false]);
    setPoint(60);
    setResult(null);
    setResultRecodes([]);
    buttonSound.unloadAsync(); //音楽停止
    slotMusic.unloadAsync(); //音楽停止
  };

  //　スロットアニメーション
  useInterval(
    () => {
      const newSlot = [...slot];
      if (slotMove[0]) newSlot[0] += 1;
      if (slotMove[1]) newSlot[1] += 1;
      if (slotMove[2]) newSlot[2] += 1;
      if (newSlot[0] >= sloatReel[0].length) newSlot[0] = 0;
      if (newSlot[1] >= sloatReel[1].length) newSlot[1] = 0;
      if (newSlot[2] >= sloatReel[2].length) newSlot[2] = 0;
      setSlot(newSlot);
    },
    slotMove[0] || slotMove[1] || slotMove[2] ? 200 : null
  );

  //サウンド再生
  const [buttonSound, setButtonSound] = React.useState();
  const [slotMusic, setSlotMusic] = React.useState();
  var playSound = async (soundFile) => {
    if (buttonSound) buttonSound.unloadAsync();
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    setButtonSound(sound);
  };
  var playSlotMusicSound = async (soundFile) => {
    if (slotMusic) slotMusic.unloadAsync();
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    setSlotMusic(sound);
  };

  // 画面構成
  return (
    <ScrollView style={[styles.container, { backgroundColor: 'whitesmoke' }]}>
      <View>
        <Title>スロットの判定をしよう</Title>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>絵柄を揃えよう</Text>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}>
        {/*ポイントと開始  ----------------------*/}
        <View style={{ alignItems: 'center', marginRight: 10 }}>
          <Title>{point}</Title>
          <Button
            mode="contained"
            color="gold"
            disabled={slotMove[0] || slotMove[1] || slotMove[2] || point < 3}
            onPress={() => bet(3)}>
            START
          </Button>
        </View>

        {/*スロット1 ----------------------*/}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 40 }}>{sloatReel[0][slot[0]]}</Text>
          <Button
            mode="contained"
            color="gold"
            disabled={!slotMove[0]}
            onPress={() => stop(0)}>
            stop
          </Button>
        </View>

        {/*スロット2 ----------------------*/}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 40 }}>{sloatReel[1][slot[1]]}</Text>
          <Button
            mode="contained"
            color="gold"
            disabled={!slotMove[1]}
            onPress={() => stop(1)}>
            stop
          </Button>
        </View>

        {/*スロット3 ----------------------*/}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 40 }}>{sloatReel[2][slot[2]]}</Text>
          <Button
            mode="contained"
            color="gold"
            disabled={!slotMove[2]}
            onPress={() => stop(2)}>
            stop
          </Button>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{}}>{result !== null ? `${result}ポイント` : ''}</Text>
      </View>

      <View style={{ marginTop: 20, width: '80%' }}>
        <Title>記録</Title>
        <Text>{resultRecodes.join(',')}</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          mode="contained"
          onPress={() => {
            reset();
          }}>
          リセット
        </Button>
      </View>

      <View
        style={{ marginTop: 40, borderTopWidth: 1, borderTopColor: 'gray' }}
      />
      <View style={{ marginTop: 20 }}>
        <Title>プログラムチャレンジ</Title>
        <Text>・絵柄が揃った時にあたり音を流す</Text>
        <Text>腕試し）同じ絵柄２つ揃った時にドラムロールを流す</Text>
        <Text>腕試し）揃った時の絵柄で音を変えてみよう</Text>
        <Text>腕試し）スロットの絵柄を増やしみよう</Text>
        <Text>腕試し）確率を変えよう</Text>
        <Text>腕試し）ゲームバランスを変えてみよう</Text>
      </View>
    </ScrollView>
  );
}

//　スクリーン設定やスタイルなど
export const SloatScreenSetting = {
  title: 'スロット',
  screenName: 'slot',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
