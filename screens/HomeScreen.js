import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaProvider,
} from 'react-native';
import { Header, AirbnbRating, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize'
import axios from 'axios';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      article_detail: {},
    };
  }

  get_article = () => {
        const url = 'https://2801-2409-4070-4484-3abf-d93f-e114-15e8-1863.ngrok.io/get-article'
        axios.get(url).then(response => {
            let details = response.data.data
            details = details.filter(data => {
              return data.lang = 'en' 
            })
            this.setState({
                article_detail: details
            })
        })
            .catch(error => {
                console.log(error.message)
            })
    }

  componentDidMount(){
    this.get_article()
  }

  render() {
        const { article_detail } = this.state
            const { text, title, url, contentType, total_events } = article_detail
            return (
                <View style={styles.container}>
                    <SafeAreaProvider />
                    <View style={styles.headerContainer}>
                        <Header
                            centerComponent={{ text: "ARTICLE RECOMMENDATION", style: styles.headerTitle }}
                            rightComponent={{ icon: "Search", color: "#fff" }}
                            backgroundColor={"#d500f9"}
                            containerStyle={{ flex: 1 }} />
                    </View>
                    <View style={styles.subContainer}>
                        <View style={styles.subTopContainer}>
                            <Text style={styles.article_text}>{text}</Text>
                        </View>
                    </View>
                </View>
            )
    }


}

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerContainer: { flex: 0.1 },
    headerTitle: { color: "#fff", fontWeight: "bold", fontSize: RFValue(18) , fontFamily:'serif' },
    subContainer: { flex: 0.9 },
    subTopContainer: { flex: 0.4, justifyContent: "center", alignItems: "center" },
    article_text: {
      fontSize:15,
      fontFamily:'sans-serif'
    },
})