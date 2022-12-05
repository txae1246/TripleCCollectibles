import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const logoImage = require('./assets/twins2.png');

function HomeScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
    let openImagePickerAsync = async () => {
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }
      setSelectedImage({ localUri:  pickerResult.uri});
    };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Triple C Collectibles</Text>
      </View>
      <View style={styles.imageSection}>
        <Image
          source= {logoImage}
        />
      </View>
      <View style={styles.snapSection}>
        <Text style={styles.snapText}>To add an item to your inventory, take a photo with your camera app, then just click below!</Text>
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {navigation.navigate('Enter Item')}}
          >
          <Text style={styles.buttonText}>Enter Item</Text> 
        </TouchableOpacity>
      </View>
    </View>
  );
}

function EnterItemScreen( {navigation} ) {
  /* 2. Get the param */
  //const { selectedImage } = route.params;
  const [year, setYear] = useState(null);
  const [manufacturer, setManufacturer] = useState(null);
  const [subset, setSubset] = useState(null);
  const [number, setNumber] = useState(null);
  const [description, setDescription] = useState(null);

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.itemImage}>Placeholder for image</Text>
      </View>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Year"
          placeholderTextColor='#808080'
          onChangeText={setYear}
          value={year}
          />
        <TextInput
          style={styles.input}
          placeholder="Company / Manufacturer"
          placeholderTextColor='#808080'
          onChangeText={setManufacturer}
          value={manufacturer}
          />
        <TextInput
          style={styles.input}
          placeholder="Sport / Subset"
          placeholderTextColor='#808080'
          onChangeText={setSubset}
          value={subset}
          />
        <TextInput
          style={styles.input}
          placeholder="Card Number / Item Number"
          placeholderTextColor='#808080'
          onChangeText={setNumber}
          value={number}
          />
          <TextInput
          style={styles.input}
          placeholder="Player / Item Description"
          placeholderTextColor='#808080'
          onChangeText={setDescription}
          value={description}
          />
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {navigation.navigate('Display Items', {
            year,
            manufacturer,
            subset,
            number,
            description
          });
        }}
        >
          <Text style={styles.buttonText}>Add Item</Text> 
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DisplayItemsScreen( { route, navigation } ) {
  const { year, manufacturer, subset, number, description } = route.params;
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.itemsSection}>
        <Text style={styles.itemsHeading}>Store Inventory</Text>
        <Text style={styles.itemImage}>Placeholder for image</Text>
        <Text style={styles.itemsLabel}>Year:</Text>
        <Text style={styles.items}>{year}</Text>
        <Text style={styles.itemsLabel}>Company / Manufacturer:</Text>
        <Text style={styles.items}>{manufacturer}</Text>
        <Text style={styles.itemsLabel}>Sport / Subset:</Text>
        <Text style={styles.items}>{subset}</Text>
        <Text style={styles.itemsLabel}>Card Number / Item Number:</Text>
        <Text style={styles.items}>{number}</Text>
        <Text style={styles.itemsLabel}>Player / Item Description:</Text>
        <Text style={styles.items}>{description}</Text>
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {navigation.navigate('Home')}}
          >
          <Text style={styles.buttonText}>Add Another Item</Text> 
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
   
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation intialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Enter Item" component={EnterItemScreen} />
        <Drawer.Screen name="Display Items" component={DisplayItemsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer:  {
    flex:  4,
    backgroundColor:  '#ffffff'
  },
  titleSection:  {
    flexGrow:  1,
    justifyContent:  'flex-end',
    padding:  10
  },
  title:  {
    fontSize:  36,
    textAlign:  'center'
  },
  imageSection:  {
    flexGrow:  1,
    padding:  10,
    alignItems: 'center'
  },
  snapSection:  {
    flexGrow:  1,
    padding:  10,
  },
  snapText:  {
    fontSize:  18,
    fontWeight:  'bold',
    textAlign:  'center'
  },
  buttonSection:  {
    flexGrow:  1,
    alignItems:  'center',
    padding:  10
  },
  button:  {
    backgroundColor:  '#002B5C',
    paddubg:  10,
    borderRadius:  5,
    height:  40,
    width:  150
  },
  button2:  {
    backgroundColor:  '#002B5C',
    paddubg:  10,
    borderRadius:  5,
    height:  60,
    width:  150
  },
  buttonText:  {
    fontSize:  24,
    textAlign:  'center',
    color:  '#ffffff'
  },
  inputSection:  {
    flexGrow:  3,
    padding:  10,
  },
  input: {
    backgroundColor: '#ecf0f1',
    fontSize: 24,
    borderRadius: 3,
    height: 50,
    padding: 5,
    marginBottom:  10,
    flex: 2,
  },
  itemsSection:  {
    flexGrow:  1,
  },
  itemsHeading: {
    textAlign:  'center',
    fontSize: 24,
    fontWeight:  'bold',
    marginBottom: 5,
  },
  itemImage:  {
    alignItems:  'center',
    textAlign:  'center',
    padding:  10
  },
  itemsLabel:  {
    fontSize:  18,
    fontWeight:  'bold',
  },
  items: {
    fontSize:  18,
    padding:  10,
  },
})