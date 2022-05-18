
import React, {useState, useEffect} from 'react'
import { StyleSheet,Text, View, Dimensions, Button } from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit';

import { RootTabScreenProps,ScreenSettings } from '../types';

export default function GraphScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [graphDataState, setGraphDataState] = useState([])
  
  //　初回のデータ
  useEffect(() => {
    makeDataX();
  },[])

  //　配列に計算結果を入れる
  const makeData = (makeFunc:Function,xmin:number,xmax:number,step:number)=>{
    let data = [];
    for(let x=xmin;x<=xmax;x+=step){
      const y:number = makeFunc(x);
      data.push({x,y})
    }
    return data;
  }
  //ボタンのファンクション
  // y=x  -10~10 step:1
  const makeDataX = ()=>{
    setGraphDataState(makeData((x:number)=>x,-10,10,1))
  }
  // y=-x*2  -10~10 step:1
  const makeDataX2 = ()=>{
    setGraphDataState(makeData((x:number)=>-x*2,-10,10,1))
  }
  // y=-x*x  -10~10 step:1
  const makeDataXX = ()=>{
    setGraphDataState(makeData((x:number)=>x*x,-10,10,1))
  }
  // y=sin(x°)  0~360 step:30
  const makeDataSinX = ()=>{
    setGraphDataState(makeData((x:number)=>Math.sin(Math.PI/(180/x)),0,360,30))
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>グラフ</Text>

      <Text>いろんなグラフを表示しよう</Text>
      <LineChart
        data={{
          labels: graphDataState.map(obj => obj.x) as [],
          datasets: [
            {
              data: graphDataState.map(obj => obj.y) as [],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // from react-native
        height={440}
        chartConfig={{
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          style: {},
        }}
        style={{
          marginVertical: 8,
        }}
      />

      <Button title="y=x" onPress={makeDataX} />
      <View style={{marginBottom:5}} />
      <Button title="y=-x*2" onPress={makeDataX2} />
      <View style={{marginBottom:5}} />
      <Button title="y=x*x" onPress={makeDataXX} />
      <View style={{marginBottom:5}} />
      <Button title="y=sin(x°)" onPress={makeDataSinX} />
    </View>
  );
}

export const GraphScreenSetting: ScreenSettings = {
  title:"グラフ",
  screenName:"Graph"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
