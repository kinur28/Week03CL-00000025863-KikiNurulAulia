import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonCard, IonCardContent, IonAlert } from '@ionic/react';
import { calculatorOutline, refreshOutline} from 'ionicons/icons';
import { useRef, useState } from "react";
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';
import InputControl from './components/InputControl';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
    const [ calculatedBMI, setCalculatedBMI ] = useState<number>();
    const [ kategoriBMI, setKategoriBMI ] = useState<string>();
    const [ error, setError ] = useState<string>();
    var [ calcUnits, setCalsUnits ] = useState<'cmkg' | 'ftlbs'>('cmkg');
    const heightInputRef = useRef<HTMLIonInputElement>(null);
    const weightInputRef = useRef<HTMLIonInputElement>(null);
    const calculateBMI = () => {
      const enteredWeight = weightInputRef.current!.value;
      const enteredHeight = heightInputRef.current!.value;

      if(!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
        setError('Please enter a valid (non-negative) input number');
        return;

      }
      const bmi = +enteredWeight / ((+enteredHeight/100)*(+enteredHeight/100));
      
      const bmiftlbs = +enteredWeight/2.2 / (((+enteredHeight/0.0328)/100)*((+enteredHeight/0.0328)/100));
      
      var kategori;
      
      
        if (bmi < 18.5 ) {
          kategori = "Kurus";
        }
        if(bmi > 18.5 && bmi < 24.9 ) {
          kategori = "Normal";
        }
        if(bmi > 25 && bmi < 29.9 ) {
          kategori = "Gemuk";
        }
        if(bmi >= 30) {
          kategori = "Obesitas";
        }
        if (bmiftlbs < 18.5 ) {
          kategori = "Kurus";
        }
        if(bmiftlbs > 18.5 && bmi < 24.9 ) {
          kategori = "Normal";
        }
        if(bmiftlbs > 25 && bmi < 29.9 ) {
          kategori = "Gemuk";
        }
        if(bmiftlbs >= 30) {
          kategori = "Obesitas";
        }
      

      if (calcUnits== 'cmkg'){
        
        setCalculatedBMI(bmi);
        setKategoriBMI(kategori);
      }
      if (calcUnits == 'ftlbs'){
        
        setCalculatedBMI(bmiftlbs);
        setKategoriBMI(kategori);
      }
        
      

     
      
    };
    const resetInputs = () => {
      weightInputRef.current!.value = '';
      heightInputRef.current!.value = '';
    };

    const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
      setCalsUnits(selectedValue);
    };
  return(  
    
  
  <IonApp>
    <IonAlert 
    isOpen={!!error}
    message={error}
    buttons={[
      {text: 'Okay'}
    ]} />

    <IonHeader>
      <IonToolbar>
        <IonTitle>BMI Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow>
          <IonCol>
            <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
            <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
            <IonInput ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Berat Badan ({calcUnits === 'ftlbs' ? 'lbs' : 'kg'})</IonLabel>
              <IonInput ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <BmiControls onCalculate={calculateBMI} onReset={resetInputs}/>
        {calculatedBMI && kategoriBMI && (
          <BmiResult bmiftlbs={calculatedBMI} bmi={calculatedBMI} kategori={kategoriBMI}/>
        )}
      </IonGrid>
    </IonContent>
  </IonApp>
  
  )
};


export default App;