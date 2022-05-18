import { Platform,　Alert as DefaultAlert } from 'react-native';

export function Alert(title:string,message?:string) {
  if(Platform.OS === "web"){
    alert(title+"\n"+message);
  }else{
    DefaultAlert.alert(title,message)
  }
}
