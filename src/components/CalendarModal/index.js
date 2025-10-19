
import { Modal, Pressable } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ptBR } from './localeCalendar';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';


export default function CalendarModal({ showCalendar, setShowCalendar, data, setData, novaData, setNovaData }){

   const handleSelectDate = (day) => {
    const [ano, mes, dia] = day.dateString.split('-');
    setData(`${dia}/${mes}/${ano}`);
    setShowCalendar(false);
  };


  return(
    <Modal
    transparent
    animationType="fade"
    visible={showCalendar}
    onRequestClose={() => setShowCalendar(false)}
    >
    <Pressable
        onPress={() => setShowCalendar(false)}
        style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        }}
    >
        <Pressable
        onPress={() => {}}
        style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            padding: 16,
            width: "85%",
            elevation: 5,
        }}
        >
        <Calendar
        onDayPress={handleSelectDate}
        markingType={'custom'} // importante para customStyles
        markedDates={{
        [data ? data.split("/").reverse().join("-") : ""]: {
      selected: true,
      customStyles: {
        container: {
          borderWidth: 3,        
          borderColor: "#2F80ED", 
          borderRadius: 8,  
          backgroundColor: '#2F80ED',  
        },
        text: {
          color: "white",        
          fontWeight: "bold", 
        },
      },
    },
  }}
  theme={{
    todayTextColor: "#2F80ED",
    arrowColor: "black",
    textSectionTitleColor:'black',
    textMonthFontSize:18,
    textDayHeaderFontSize:14,
    textMonthFontWeight:'bold',
    textDayHeaderFontWeight:'bold',
  }}
/>
        </Pressable>
    </Pressable>
    </Modal>
)
}
