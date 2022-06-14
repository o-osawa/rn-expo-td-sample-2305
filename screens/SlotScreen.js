import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { Title, Text, Button } from 'react-native-paper';
import useInterval from '../hooks/useInterval';

const sloatReel = [
  ['🍉',  '7️⃣'],
  ['🍉', '7️⃣'],
  ['7️⃣', '🍉'],
];

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
  };

  //stopボタン処理
  const stop = (slotNum) => {
    const newSlotMove = [...slotMove];
    newSlotMove[slotNum] = false;
    setSlotMove(newSlotMove);

    if (!newSlotMove[0] && !newSlotMove[1] && !newSlotMove[2]) {
      resultPointCheck(newSlotMove);
    }
  };

  //全部停止時点数チェック
  const resultPointCheck = (newSlotMove) => {
    let getPoint = 0;
    if (
      sloatReel[0][slot[0]] === sloatReel[1][slot[1]] &&
      sloatReel[0][slot[0]] === sloatReel[2][slot[2]]
    ) {
      getPoint = 15;
    }

    setPoint(point + getPoint);
    setResult(getPoint);
    setResultRecodes([getPoint, ...resultRecodes]);
  };

  //リセットボタン処理
  const reset = () => {
    setSlotMove([false, false, false]);
    setPoint(60);
    setResult(null);
    setResultRecodes([]);
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
    slotMove[0] || slotMove[1] || slotMove[2] ? 100 : null
  );

  // 画面構成
  return (
    <ScrollView style={styles.container}>
      <View>
        <Title>スロットを動かして点数計算しよう</Title>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>絵柄を揃えよう</Text>
      </View>
      <View
        style={{
          marginTop: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}>
        <View style={{ alignItems: 'center', marginRight: 10 }}>
          <Title>{point}</Title>
          <Button
            mode="contained"
            disabled={slotMove[0] || slotMove[1] || slotMove[2] || point < 3}
            onPress={() => bet(3)}>
            3BET
          </Button>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Title>{sloatReel[0][slot[0]]}</Title>
          <Button
            mode="contained"
            disabled={!slotMove[0]}
            onPress={() => stop(0)}>
            stop
          </Button>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Title>{sloatReel[1][slot[1]]}</Title>
          <Button
            mode="contained"
            disabled={!slotMove[1]}
            onPress={() => stop(1)}>
            stop
          </Button>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Title>{sloatReel[2][slot[2]]}</Title>
          <Button
            mode="contained"
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
        style={{ marginTop: 40, borderTopWidth: 1, borderTopColor: '#999' }}
      />
      <View style={{ marginTop: 20 }}>
        <Title>プログラムチャレンジ</Title>
        <Text>・スロットの絵柄を増やしみよう</Text>
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
