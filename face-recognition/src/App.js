import React, { Component } from'react';


import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

// const app = new Clarifai.App({
//   apiKey: '296073963aa148aeae830e620e24afb9',
// });



// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: 'Hallo',
    email: '',
    entries: 0,
    joinded: '',
  },
};

class App extends Component{
  constructor(props) {
    super(props);
    this.state = initialState
  }

  loadUser = data  => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joinded: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const bounding_box = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: bounding_box.left_col * width,
      topRow: bounding_box.top_row * height,
      rightCol: width - (bounding_box.right_col * width),
      bottomRow: height - (bounding_box.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://sheltered-shore-11150-402f68b72a3d.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
        .then(response => response.json())
    .then(output => {
      if (output) {
        fetch('https://sheltered-shore-11150-402f68b72a3d.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count.entries }), () => {
          });
        })
        .catch(console.log);
        // .then(count => {
        //   this.setState(Object.assign(this.state.user, { entries: count}))
        // })
      };
      this.displayFaceBox(
                    this.calculateFaceLocation(JSON.parse(output))
                    )
    })
    .catch(error => console.log('error', error));

    // * console logging position for box
    // console.log(JSON.parse(output).outputs[0].data.regions[0].region_info.bounding_box)
  };

  onRouteChange = (value) => {

    if (value === 'signin'|| value === 'register') {
      this.setState({ initialState });
    } else if (value === 'home') {
      this.setState({ isSignedIn: true });
    }

    this.setState({ route: value });

    
  }

  render() {
  return (
    <div className="App">
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      {this.state.route === 'home' 
      ? <div>
          <Logo/>
          <Rank 
            name={this.state.user.name}
            entries={this.state.user.entries}/>
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        :(
          this.state.route ==='signin' ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )}
      <ParticlesBg color="#ff9e3ad7f" num={10} type="circle" bg={true} />
    </div>
  );
  }
}

export default App;
