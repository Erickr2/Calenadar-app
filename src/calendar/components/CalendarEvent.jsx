
export const CalendarEvent = ({ event }) => { //desestrcuturo el evento para poder acceder a sus porpiedades

    const { title, user} = event; //desestructuro las propiedades title y user de mi evento

    return (
        <>
        <strong> { title } </strong>
        <span> - { user.name } </span>
        </>
    )
}
