import { format, parseISO } from 'date-fns';
export const dateFormatForAPI = (date: Date): string => {
   return date.toLocaleDateString('sv-SE');
};
export const dateFormatForUI = (dateStr: string): string => {
   return( format(parseISO(dateStr), 'dd.MM.yyyy'))
}