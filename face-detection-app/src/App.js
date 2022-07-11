import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import React from 'react';




class App extends React.Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
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
    this.setState({route: route})
  }
  
  url = () => {
    return this.state.input
  } 

  render() {
    return (
    <div className="App">
      <Navigation onRouteChange={this.onRouteChange} />
      
      { this.state.route === 'signin' 
      ? <Signin onRouteChange={this.onRouteChange}/>
      : <div> 
          <Logo />
          <Rank />
          <ImageLinkForm displayFaceBox={this.displayFaceBox} calculateFaceLocation={this.calculateFaceLocation} handleChange={this.handleChange} setSt={this.setSt} url={this.url}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>  
      }
    </div>
  );
  }
  
}

export default App;
