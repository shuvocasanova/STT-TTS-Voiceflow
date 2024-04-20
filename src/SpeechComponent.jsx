


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SpeechComponent.css';
// Load environment variables from .env file


const SpeechComponent = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [listening, setListening] = useState(true); // Flag to control automatic listening
    const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setText(speechResult);
      sendTextToVoiceflow(speechResult);
    };
    if (listening) {
      recognition.start(); // Start listening automatically when component mounts and when listening flag is true
    }

    return () => {
      recognition.stop(); // Stop listening when component unmounts
    };
  }, [listening]); // Re-run effect when listening flag changes

  const sendTextToVoiceflow = async (text) => {
    try {
      const response = await axios.post(
        'https://general-runtime.voiceflow.com/state/user/pizza-app-user-123/interact?logs=off',
        {
          action: {
            type: 'text',
            payload: text,
          },
          config: {
            tts: false,
            stripSSML: true,
            stopAll: true,
            excludeTypes: ['block', 'debug', 'flow'],
          },
        },
        {
          headers: {
            Authorization: 'VF.DM.65fde2d4f066f5ce54054e5e.X6uZDJLOW3lAjOxN',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      const voiceflowResponse = response.data[2].payload.message || 'GoodBye';
        console.log(voiceflowResponse)
      setResponse(voiceflowResponse);
      speak(voiceflowResponse); // Speak the response from Voiceflow
    } catch (error) {
      console.error('Error sending text to Voiceflow:', error);
    }
  };

  const speak = (textToSpeak) => {
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.onend = () => {
        setSpeaking(true);
      setListening(true); // Set listening flag to true when TTS is done
    };
      // setSpeaking(false);
    setListening(false); // Set listening flag to false before speaking
    speechSynthesis.speak(utterance); // Using the browser's built-in SpeechSynthesis API
  };

    

  return (
      <div className="container">
    <div className={`logo ${listening ? 'listening' : ''} ${speaking ? 'speaking' : ''}`} />
          <p>Listening...</p>
          <p>{text}</p>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default SpeechComponent;
