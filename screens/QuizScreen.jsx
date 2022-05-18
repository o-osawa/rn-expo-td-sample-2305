import { useState } from 'react'
import { StyleSheet,  View} from 'react-native';

import { Title,Text,Button } from 'react-native-paper';

// スクリーン
export default function QuizScreen({ navigation }) {
  //　画面に表示する変数
  const [answer, setAnsewer] = useState({
    title:"どれかな？",
    memo:"正解と思うボタンを押そう！",
  });

  // 画面構成
  return (
    <View style={styles.container}>
      <View style={{marginTop:20}}>
        <Title>いきなりクイズ</Title>
      </View>
      <View style={{marginTop:20}}>
        <Text>では問題です！</Text>
        <Text>ORSOはイタリア語では何と読むでしょう？</Text>
      </View>

      <View style={{marginTop:20}}>
        <Button mode="contained" onPress={() =>setAnsewer({title:"不正解",memo:"おしい！いきものです"})}>シャケ</Button>
        <View style={{marginBottom:5}} />
        <Button mode="contained" onPress={() =>setAnsewer({title:"不正解",memo:"違いました。残念です！"})} >無限</Button>
        <View style={{marginBottom:5}} />
        <Button mode="contained" onPress={() =>setAnsewer({title:"正解",memo:"イタリア語で熊でした！"})} >熊</Button>
        <View style={{marginBottom:5}} />
        <Button mode="contained" onPress={() =>setAnsewer({title:"不正解",memo:"違うよ"})} >発明</Button>
      </View>    
      
      <View style={{marginTop:20}}>
        <Title>{answer.title}</Title>
        <Text>{answer.memo}</Text>
      </View>

    </View>
  );
}

//　スクリーン設定やスタイルなど
export const QuizuScreenSetting = {
  title:"クイズ",
  screenName:"quiz"
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
