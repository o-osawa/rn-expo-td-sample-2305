import { StyleSheet,Button } from 'react-native';
import { Alert } from '../components/Alert';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, ScreenSettings } from '../types';

export default function HomeworkScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const kuzi = ["①","②","③","④","⑤","⑥"]
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>お題</Text>

      <Text>おみくじ</Text>
      <Button title="うらなう" onPress={() =>Alert(kuzi[Math.floor(Math.random()*6)],"でした")} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />      
    </View>
  );
}

export const HomeworkScreenSetting: ScreenSettings = {
  title:"お題",
  screenName:"Homework"
  
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
