import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import diaryColors from "../../colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiaryWrite from "./DiaryWrite";
import { useDB } from "./Context";
import { FlatList, LayoutAnimation, TouchableOpacity } from "react-native";
import mobileAds from 'react-native-google-mobile-ads';


const View = styled.View`
  flex: 1;
  padding: 0px 30px;
  padding-top: 60px;
  background-color: ${diaryColors.bgColor};
`;
const Title = styled.Text`
  color: ${diaryColors.textColor};
  font-size: 38px;
  margin-bottom: 50px;
  font-weight: 500;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${diaryColors.btnColor};
  elevation: 5;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

const Record = styled.View`
  background-color: ${diaryColors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px rgba(41, 30, 95, 0.1);
`;

const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;
const Message = styled.Text`
  font-size: 18px;
`;

const Separator = styled.View`
  height: 10px;
`;


const DiaryTabs = createNativeStackNavigator();

const DiaryHome = ({ navigation: { navigate } }) => {
    const realm = useDB();
    const [feelings, setFeelings] = useState([]);

    useEffect(() => {
      const feelings = realm.objects("Feeling");
      feelings.addListener((feelings) => {
        LayoutAnimation.spring();
        setFeelings(feelings.sorted("_id", true));
      });
      return () => {
        feelings.removeAllListeners();
      };
    }, []);
    
    const onPress = (id) => {
      realm.write(() => {
        const feeling = realm.objectForPrimaryKey("Feeling", id);
        realm.delete(feeling);
      });
    };
    

    return (
      <View>
        <Title>My journal</Title>
        <FlatList 
          data={feelings} 
          keyExtractor={ (feeling) => feeling._id + ""} 
          contentContainerStyle={{ paddingVertical: 10 }}
          ItemSeparatorComponent={Separator}
          renderItem= { ({item}) => (
            <TouchableOpacity onPress={() => onPress(item._id)}>
              <Record>
                <Emotion>{item.emotion}</Emotion>
                <Message>{item.message}</Message>
              </Record>
            </TouchableOpacity>            
          )}
        />
        <Btn onPress={() => navigate("DiaryWrite")}>
          <Ionicons name="add" color="white" size={40} />
        </Btn>
      </View>
    );
};

const DiaryNavigator = () => (
  <DiaryTabs.Navigator screenOptions={{ headerShown: false, presentation: "modal" }}>
    <DiaryTabs.Screen name="DiaryHome" component={DiaryHome} />
    <DiaryTabs.Screen name="DiaryWrite" component={DiaryWrite} />
  </DiaryTabs.Navigator>
);


export default DiaryNavigator;