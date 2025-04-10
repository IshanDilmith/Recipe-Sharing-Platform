import { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from "lucide-react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const TimerComponent = ({ cookTime, isOpen, handleClose }) => {
  const [timeRemaining, setTimeRemaining] = useState(cookTime * 60); // Convert minutes to seconds
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      setIsActive(false);
      setIsComplete(true);
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeRemaining(cookTime * 60);
    setIsActive(false);
    setIsComplete(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center mb-2">
        <Clock className="text-gray-700 mr-2" size={20} />
        <h3 className="text-lg font-medium">Cooking Timer</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className={`text-3xl font-bold ${isComplete ? 'text-green-600' : isActive ? 'text-blue-600' : 'text-gray-800'}`}>
          {formatTime(timeRemaining)}
        </div>
        
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={toggleTimer}
            className={`flex items-center px-4 py-2 rounded-md ${
              isActive 
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
            disabled={isComplete}
          >
            {isActive ? (
              <>
                <Pause size={18} className="mr-1" /> Pause
              </>
            ) : (
              <>
                <Play size={18} className="mr-1" /> Start
              </>
            )}
          </button>
          
          <button 
            onClick={resetTimer}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            <RotateCcw size={18} className="mr-1" /> Reset
          </button>
        </div>
      </div>
      
      {isComplete && (
        <div className="mt-3 p-2 bg-green-100 text-green-700 rounded-md text-center">
          Time's up! Your dish should be ready.
        </div>
      )}
    </div>
    <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TimerComponent;