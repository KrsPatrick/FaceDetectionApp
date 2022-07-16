import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Registration from './components/Registration/Registration';
import Signin from './components/Signin/Signin';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import React from 'react';

const initalState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
      id: '',
      name: '',
      email: '',
      entries: '0',
      joined: ""
  }
}

class App extends React.Component {

  constructor() {
    super();
    this.state = initalState
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }       
    })
  }

  

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = +image.height
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  handleChange = (event) => {
    this.setState({input: event.target.value});
  }

  setSt = () => {
    this.setState({imageUrl: this.state.input})
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initalState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  
  url = () => {
    return this.state.input
  } 

  render() {
    return (
    <div className="App">
      <Navigation issSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
      
      { this.state.route === 'home' 
      ? <div> 
          <Logo />
          <Rank name={this.state.user.name} />
          <ImageLinkForm id={this.state.user.id} displayFaceBox={this.displayFaceBox} calculateFaceLocation={this.calculateFaceLocation} handleChange={this.handleChange} setSt={this.setSt} url={this.url}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
      : (
        this.state.route === 'signin'
        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        : <Registration loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

      )   
        
      }
    </div>
  );
  }
  
}

export default App;
