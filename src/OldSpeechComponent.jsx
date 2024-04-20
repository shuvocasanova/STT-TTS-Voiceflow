// import React, { useState } from 'react';
// import axios from 'axios';

// const SpeechComponent = () => {
//   const [text, setText] = useState('');
//   const [response, setResponse] = useState('');
//   const [synth, setSynth] = useState(null);

//   const recognition = new window.webkitSpeechRecognition();
//   recognition.lang = 'en-US';
//   recognition.onresult = (event) => {
//     const speechResult = event.results[0][0].transcript;
//     setText(speechResult);
//     sendTextToVoiceflow(speechResult);
//   };

//   const speak = (textToSpeak) => {
//     if (!synth) return; // Ensure synth is initialized
//     const utterance = new SpeechSynthesisUtterance(textToSpeak);
//     synth.speak(utterance);
//   };

//   const startListening = () => {
//     recognition.start();
//   };

//   const sendTextToVoiceflow = async (text) => {
//     try {
//       const response = await axios.post(
//         'https://general-runtime.voiceflow.com/state/user/pizza-app-user-123/interact?logs=off',
//         {
//           action: {
//             type: 'text',
//             payload: text,
//           },
//           config: {
//             tts: false,
//             stripSSML: true,
//             stopAll: true,
//             excludeTypes: ['block', 'debug', 'flow'],
//           },
//         },
//         {
//           headers: {
//             Authorization: 'VF.DM.65fde2d4f066f5ce54054e5e.X6uZDJLOW3lAjOxN',
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//           },
//         }
//       );
//       const voiceflowResponse = response.data[0].payload.query.output || '';
//       setResponse(voiceflowResponse);
//       speak(voiceflowResponse); // Speak the response from Voiceflow
//     } catch (error) {
//       console.error('Error sending text to Voiceflow:', error);
//     }
//   };

//   // Asynchronously initialize synth
//   useState(() => {
//     if ('speechSynthesis' in window) {
//       const synth = window.speechSynthesis;
//       if (synth) {
//         setSynth(synth);
//       }
//     }
//   }, []);

//   return (
//     <div>
//       <button onClick={startListening}>Start Listening</button>
//       <button onClick={() => speak(text)}>Speak</button>
//       <p>{text}</p>
//       {response && <p>Response: {response}</p>}
//     </div>
//   );
// };

// export default SpeechComponent;