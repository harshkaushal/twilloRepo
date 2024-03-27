import React, { useState, useEffect } from 'react';
import { Device } from 'twilio-client';

const App = () => {
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const token = ''; // Replace with your Twilio access token
    const options = {
      codecPreferences: ["opus", "pcmu"],
      allowIncomingWhileBusy: true,
      fakeLocalDTMF: true,
      debug: true,
      warnings: true,
      enableImprovedSignalingErrorPrecision: true,
    };

    // logLevel: 'debug',
    // Create a new Twilio Device instance when the component mounts
    const twilioDevice = new Device();

    // Setup the device with token and options
    twilioDevice.setup(token, options);

    // Event listeners for Twilio Device
    twilioDevice.on('ready', () => {

      console.log('Twilio.Device Ready');
    });

    twilioDevice.on('error', (error) => {
      console.error('Twilio.Device Error: ', error.message);
    });

    setDevice(twilioDevice);


    // Clean up function to disconnect and destroy the device when component unmounts
    return () => {
      if (twilioDevice) {
        twilioDevice.disconnectAll();
        twilioDevice.destroy();
      }
    };
  }, []); // Run once when component mounts

  const handleMakeCall = () => {
    if (device) {
      const params = {
        To: '6897104124', // Replace with the number you want to call

      };
      const connection = device.connect(params);
      connection.on('error', (error) => {
        console.error('Twilio.Connection Error: ', error);
      });

      connection.on('hangup', (error) => {
        console.error('Twilio.Connection hangup: ', error);
      });
    }
  };

  return (
    <div>
      <h1>Twilio Device Setup</h1>
      <button onClick={handleMakeCall}>Make Call</button>
    </div>
  );
};

export default App;
