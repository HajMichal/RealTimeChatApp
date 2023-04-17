import { format } from 'date-fns'

export const formatTime = (messageTime: Date) => {
    const date = new Date(messageTime);

    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  
    let dateFormat = isToday ? "HH:mm" : "dd/MM";
  
    if (date.getFullYear() !== today.getFullYear()) {
      dateFormat += "/yyyy";
    }
  
    return format(date, dateFormat);
}

