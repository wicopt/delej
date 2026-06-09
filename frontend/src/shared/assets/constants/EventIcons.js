import flight from "../icons/Events/flight.svg"
import restaurant from "../icons/Events/restaurant.svg"
import camping from "../icons/Events/camping.svg"
export const EVENT_ICONS=[
    {id:0, label:"Самолёт", icon: flight, color:"var(--accent-color)"},
    {id:1, label:"Ресторан", icon: restaurant, color:"var(--accent-color)"},
    {id:2, label:"Поход", icon: camping, color:"var(--accent-color)"},
    {id:3, label:"Самолёт", icon: flight, color:"var(--accent-color)"},
]
export const getEventIcon = (iconId) =>
  EVENT_ICONS.find((e) => e.id === Number(iconId)) ?? EVENT_ICONS[0];