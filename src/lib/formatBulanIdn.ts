import { format } from "date-fns";
import { id } from "date-fns/locale";

export const currentMonth = format(new Date(), "MMMM", { locale: id });
console.log(currentMonth);
