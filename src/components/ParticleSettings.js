import React, { Component } from 'react';
import Particles from 'react-tsparticles';

class ParticleSettings extends Component {
    render() {
        return (
            <div>
                <Particles 
                    height='1000px' width='100vw'
                    id='tsparticles'
                    options={{
                        background: {
                            color: "#000"
                          },
                          detectRetina: false,
                          fpsLimit: 30,
                          interactivity: {
                            detectsOn: "canvas",
                            events: {
                              resize: true
                            }
                          },
                          particles: {
                            color: {
                              value: "#fff"
                            },
                            number: {
                              density: {
                                enable: true,
                                area: 1080
                              },
                              limit: 0,
                              value: 400
                            },
                            opacity: {
                              animation: {
                                enable: true,
                                minimumValue: 0.05,
                                speed: 0.25,
                                sync: false
                              },
                              random: {
                                enable: true,
                                minimumValue: 0.05
                              },
                              value: 1
                            },
                            shape: {
                              type: "circle"
                            },
                            size: {
                              random: {
                                enable: true,
                                minimumValue: 0.5
                              },
                              value: 1
                            },
                            move:{
                                direction: 'none',
                                enable: true,
                                outMode: 'bounce',
                                random: false,
                                speed: .1,
                                straight: false,
                            }
                        }
                        
                    }}
                />
            </div>
        )
    }
}

export default ParticleSettings;