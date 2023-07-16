import {useState} from 'react';
//local storage hook syncs the state to the browser's local storage

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(()=>{
        try {
            //check to see if a value exists in our localStorage
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            console.log(err)
            return defaultValue;
        }
    });
    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue)) 
        } catch (err) {
            console.log(err)
        };
        setStoredValue(newValue);
    }
    return [storedValue, setValue];
}